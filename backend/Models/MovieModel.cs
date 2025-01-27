using System.ComponentModel.DataAnnotations;

namespace backend.models  
{ 
    public class MovieModel 
    {
        [Key]
        public int Id { get; set; } // ID interno do banco de dados
        public int TMDBId { get; set; } // ID do TMDB do filme
        [Required]
        public string Title { get; set; } = string.Empty; // Título do filme
        public string? OriginalTitle { get; set; } // Título original do filme
        public string? Overview { get; set; } // Resumo/descrição do filme
        public int? Runtime { get; set; } // Duração em minutos
        public string? PosterPath { get; set; } // Caminho do poster (OMDB)
        public string? FilePath { get; set; } // Caminho das imagens (TMDB)
        // public int? Year { get; set; } // Ano de lançamento
        // public List<string>? Genre { get; set; } // Lista de gêneros do filme
        // public decimal? IMDBRating { get; set; } // Nota do IMDB
        // public decimal? RottenRating { get; set; } // Nota do Rotten Tomatoes
    }
}
