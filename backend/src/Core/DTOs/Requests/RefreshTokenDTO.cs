namespace backend.src.Core.DTOs.Requests
{
  public record RefreshTokenRequest(string AccessToken, string RefreshToken);
}