namespace backend.src.Core.DTOs.Requests;
public class MovieDTO
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? OriginalTitle { get; set; }
    public string? Overview { get; set; }
    public int Year { get; set; }
}