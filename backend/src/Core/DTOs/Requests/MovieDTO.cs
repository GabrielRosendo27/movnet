namespace backend.src.Core.DTOs.Requests;
public class MovieDTO
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int? Year { get; set; }
    public List<string>? Genre { get; set; }
    public decimal? IMDBRating { get; set; }
    public int? RottenRatting { get; set; }
    public string? FilePath { get; set; }
    // public string? Overview { get; set; }
}