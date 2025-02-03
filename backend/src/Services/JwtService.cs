using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backend.models;
using Microsoft.Extensions.Options;
using backend.src.Services;
public class JwtService(IOptions<JwtSettings> settings)
{
  private readonly JwtSettings? _settings = settings.Value;

    public string GenerateJwtToken(UserModel user)
  {
    JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();

    var claims = new[]{
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings?.SecretKey!));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
      issuer: _settings?.Issuer,
      audience: _settings?.Audience,
      claims: claims,
      expires: DateTime.Now.AddMinutes(15),
      signingCredentials: creds
    );
    return new JwtSecurityTokenHandler().WriteToken(token);
  }
  public string GenerateRefreshToken()
  {
    var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
  }

  public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
  {
    var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _settings?.Issuer,
            ValidAudience = _settings?.Audience,
            IssuerSigningKey = new SymmetricSecurityKey
              (Encoding.UTF8.GetBytes(_settings?.SecretKey!)),
            ValidateLifetime = false
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
  }

}