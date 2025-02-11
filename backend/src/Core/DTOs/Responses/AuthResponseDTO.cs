namespace backend.src.Core.DTOs.Responses{
  public record AuthResponse(string AccessToken, string RefreshToken);
  public record ErrorResponse(string Message);
}