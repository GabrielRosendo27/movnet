using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.src.controllers
{

[ApiController]
[Route("api/[controller]")]
  public class AuthController(AppDbContext context, JwtService jwtService) : ControllerBase 
  {
    private readonly AppDbContext _context = context;
    private readonly JwtService _jwtService = jwtService;
    
    [HttpPost("login")]
        public ActionResult<object> Login(UserModel user)
        {
            var foundUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
            {
                return Unauthorized("E-mail ou senha inválidos.");
            }

            var accessToken = _jwtService.GenerateJwtToken(foundUser);
            var refreshToken = _jwtService.GenerateRefreshToken();

            foundUser.RefreshToken = refreshToken;
            foundUser.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _context.SaveChanges();

            return Ok(new
            {
                token = accessToken,
                refreshToken
            });
        }
        private string GenerateJwtToken(UserModel user)
{
    JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Remove(JwtRegisteredClaimNames.Sub);
    var claims = new[]{
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
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
        [HttpPost("refresh-token")]
        public ActionResult<object> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var principal = GetPrincipalFromExpiredToken(request.AccessToken!);
            var userId = int.Parse(principal.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
            
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            
            if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiry <= DateTime.UtcNow)
            {
                return Unauthorized("Token inválido");
            }

            var newAccessToken = GenerateJwtToken(user);
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
            var userIdString = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (!int.TryParse(userIdString, out int userId))
            {
                return BadRequest("ID do usuário inválido.");
            }
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

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
                ValidIssuer = "sua-aplicacao",     
                ValidAudience = "seus-usuarios",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("sua-chave-secreta-super-segura-de-32-caracteres")),
                ValidateLifetime = false 
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
            return principal;
            
        }
    

    }
}