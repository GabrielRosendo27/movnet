using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
namespace backend.controllers
{

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
  {
      private readonly AppDbContext _context;  

      public UserController(AppDbContext context)  {
        _context = context;
      }

      [HttpGet]
      
      public ActionResult<List<UserModel>> SearchUsers(){
        var users = _context.Users.Take(1).ToList();
        return Ok(users);
      }
      
      
      [HttpGet("main")]
      [Authorize]
      public ActionResult<object> GetUserDetails()
{
    var authHeader = HttpContext.Request.Headers.Authorization.ToString();
    if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Unauthorized("Token não encontrado ou inválido.");
    }

    var token = authHeader["Bearer ".Length..].Trim();
    var handler = new JwtSecurityTokenHandler();

    try
    {
        var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
        var userEmail = jwtToken?.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (userEmail == null)
        {
            return Unauthorized("Token inválido ou expiro.");
        }

        var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null)
        {
            return NotFound("Usuário não encontrado.");
        }

        return Ok(new { userName = user.User });
    }
    catch (Exception ex)
    {
        return BadRequest($"Erro ao processar o token: {ex.Message}");
    }
}




      [HttpPost]
      public async Task<ActionResult<UserModel>> RegisterUser(UserModel user){
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(SearchUsers), new {id = user.Id}, user);
      }
      
      [HttpPost("login")]
      public ActionResult<string> Login(UserModel user){
        var foundUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
        if(foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password)) { 
          return Unauthorized("E-mail ou senha inválidos."); 
        }

        var claims = new[]{
          new Claim(JwtRegisteredClaimNames.Sub, foundUser.Email),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sua-chave-secreta-super-segura-de-32-caracteres"));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
          issuer: "sua-aplicacao",
          audience: "seus-usuarios",
          claims: claims,
          expires: DateTime.Now.AddHours(2),
          signingCredentials: creds
      );
      var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
      return Ok(new { token = tokenString });
      }
        
  }
}