using System.ComponentModel.DataAnnotations;

namespace backend.models  
{ 
    public class MovieModel 
    {
        [Key]
        public int Id { get; set; } 
        public int TMDBId { get; set; } 
        [Required]
        public string Title { get; set; } = string.Empty; 
        public string? OriginalTitle { get; set; } 
        public string? Overview { get; set; } 
        public int? Runtime { get; set; } 
        public string? PosterPath { get; set; } 
        public string? FilePath { get; set; } 
        public int? Year { get; set; } 
        public List<string>? Genre { get; set; } 
        public decimal? IMDBRating { get; set; } 
        public decimal? RottenRating { get; set; } 
    }
}
