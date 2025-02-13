using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using backend.src.Core.Interfaces.Repositories;
using backend.src.Core.Interfaces.Services;
using backend.src.Core.DTOs.Responses;
using backend.src.Core.Entities;

namespace backend.src.Infrastructure.Services{
public class JwtService(
     IOptions<JwtSettings> settings,
     IUserRepository userRepository) : IJwtService
{
    private readonly JwtSettings _settings = settings.Value ?? throw new ArgumentNullException(nameof(settings));
    private readonly IUserRepository _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));

        public async Task<AuthResponse> Login (string email, string password){

            var user = await _userRepository.GetByEmailAsync(email);
        
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                throw new UnauthorizedAccessException("Credenciais inválidas");
        
            var accessToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddMinutes(15);
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return new AuthResponse(accessToken, refreshToken);
    }
     public string GenerateJwtToken(UserModel user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var ArgumentNullExceptionKey = "Key inválida";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SecretKey!) ?? throw new ArgumentNullException(ArgumentNullExceptionKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
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
     public async Task<AuthResponse> RefreshToken(string accessToken, string refreshToken)
    {
        
        var principal = GetPrincipalFromExpiredToken(accessToken);
       
        
        var userId = int.Parse(principal.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
        
        var user = await _userRepository.GetByIdAsync(userId);
        
        if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
        throw new ArgumentException("Tokens inválidos"); 

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiry <= DateTime.UtcNow)
            throw new SecurityTokenException("Token inválido");

        var newAccessToken = GenerateJwtToken(user);
        var newRefreshToken = GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        _userRepository.Update(user);
        await _userRepository.SaveChangesAsync();

        return new AuthResponse(newAccessToken, newRefreshToken);

    }
     public async Task RevokeToken(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null) return;
        
        user.RefreshToken = null;
        _userRepository.Update(user);
        await _userRepository.SaveChangesAsync();
    }
     private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _settings!.Issuer,
            ValidAudience = _settings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SecretKey!)),
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
    }

    }


 }