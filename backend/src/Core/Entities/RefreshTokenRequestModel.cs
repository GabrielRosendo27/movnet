namespace backend.src.Core.Entities;
public class RefreshTokenRequest
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
}