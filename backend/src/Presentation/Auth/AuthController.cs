using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.src.Core.DTOs.Requests;
using backend.src.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.src.Presentation.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IJwtService jwtService) : ControllerBase 
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var response = await jwtService.Login(request.Email, request.Password);
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var response = await jwtService.RefreshToken(request.AccessToken, request.RefreshToken);
                return Ok(response);
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> RevokeToken()
        {
            var userId = int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);
            await jwtService.RevokeToken(userId);
            return NoContent();
        }
    }
}