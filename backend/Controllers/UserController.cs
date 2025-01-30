using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
namespace backend.controllers
{

[ApiController]
[Route("api/[controller]")]
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
      public ActionResult<object> Login(UserModel user){
        var foundUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
        if(foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password)) { 
          return Unauthorized("E-mail ou senha inválidos."); 
        }

        // Gera Access Token
    var accessToken = GenerateJwtToken(foundUser.Email);
    
    // Gera Refresh Token
    var refreshToken = GenerateRefreshToken();
    
    // Atualiza o usuário no banco
    foundUser.RefreshToken = refreshToken;
    foundUser.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
     _context.SaveChanges();

    return Ok(new { 
        token = accessToken,
        refreshToken
    });
}

private string GenerateJwtToken(string email)
{
    var claims = new[]{
        new Claim(JwtRegisteredClaimNames.Sub, email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sua-chave-secreta-super-segura-de-32-caracteres"));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: "sua-aplicacao",
        audience: "seus-usuarios",
        claims: claims,
        expires: DateTime.Now.AddMinutes(15), 
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

      private string GenerateRefreshToken()
      {
          var randomNumber = new byte[64];
          using var rng = RandomNumberGenerator.Create();
          rng.GetBytes(randomNumber);
          return Convert.ToBase64String(randomNumber);
      }

      //   var claims = new[]{
      //     new Claim(JwtRegisteredClaimNames.Sub, foundUser.Email),
      //     new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      //   };
      //   var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sua-chave-secreta-super-segura-de-32-caracteres"));

      //   var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      //   var token = new JwtSecurityToken(
      //     issuer: "sua-aplicacao",
      //     audience: "seus-usuarios",
      //     claims: claims,
      //     expires: DateTime.Now.AddHours(2),
      //     signingCredentials: creds
      // );
      // var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
      // return Ok(new { token = tokenString});
      // }
      
       [HttpPost("refresh-token")]
public ActionResult<object> RefreshToken([FromBody] RefreshTokenRequest request)
{
    var principal = GetPrincipalFromExpiredToken(request.AccessToken);
    var email = principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
    
    var user = _context.Users.FirstOrDefault(u => u.Email == email);
    
    if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiry <= DateTime.UtcNow)
    {
        return Unauthorized("Token inválido");
    }

    var newAccessToken = GenerateJwtToken(user.Email);
    var newRefreshToken = GenerateRefreshToken();
    
    user.RefreshToken = newRefreshToken;
    _context.SaveChanges();

    return Ok(new {
        token = newAccessToken,
        refreshToken = newRefreshToken
    });
}

[HttpPost("revoke-token")]
[Authorize]
public IActionResult RevokeToken()
{
    var email = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
    var user = _context.Users.FirstOrDefault(u => u.Email == email);
    
    if (user == null) return BadRequest();
    
    user.RefreshToken = null;
    _context.SaveChanges();

    return NoContent();
}

private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
{
    var tokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sua-chave-secreta-super-segura-de-32-caracteres")),
        ValidateLifetime = false // Permite token expirado
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
    return principal;
}
        
  }
}