namespace backend.models  
{ 
public class UserModel {
  public int Id { get; set; }
  public string? User {get; set;} 
  public string? Email {get; set;}
  public string? Password {get; set;}
  public string? RefreshToken { get; set; } // Novo campo
  public DateTime RefreshTokenExpiry { get; set; } // Novo campo
}
}
