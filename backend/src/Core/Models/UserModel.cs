namespace backend.models  
{ 
public class UserModel {
  public int Id { get; set; }
  public string? User {get; set;} 
  public string? Email {get; set;}
  public string? Password {get; set;}
  public string? RefreshToken { get; set; } 
  public DateTime RefreshTokenExpiry { get; set; } 
  public List<UserMovie>? UserMovies { get; set; }
}
}
