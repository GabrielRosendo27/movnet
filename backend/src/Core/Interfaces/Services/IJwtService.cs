using backend.models;
using backend.src.Core.DTOs.Responses;
using System.Threading.Tasks;

namespace backend.src.Core.Interfaces.Services
{
    public interface IJwtService 
    {
        Task<AuthResponse> Login(string email, string password);
        string GenerateJwtToken(UserModel user);
        string GenerateRefreshToken();
        Task<AuthResponse> RefreshToken(string accessToken, string refreshToken); 
        Task RevokeToken(int userId); 
    }
}