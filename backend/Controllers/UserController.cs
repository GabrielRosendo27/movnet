using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.data;
using backend.models;
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

        // Token Creation

        var claims = new[]{
          new Claim(JwtRegisteredClaimNames.Sub, foundUser.Email),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("chave-secreta-super-segura"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
          issuer: "sua-aplicacao",
          audience: "seus-usuarios",
          claims: claims,
          expires: DateTime.Now.AddHours(2),
          signingCredentials: creds
      );
      var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
      return Ok(new { Token = tokenString });
      }
        
  }
}