
using backend.src.Core.Entities;
using backend.src.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
namespace backend.src.Presentation.Movies{


[ApiController]
[Route("api/[controller]")]
public class MovieController(AppDbContext context, HttpClient httpClient) : ControllerBase
{
  private readonly AppDbContext _context = context;  
   private readonly HttpClient _httpClient = httpClient;

   [HttpGet("popular")]
public async Task<IActionResult> GetPopularMovies()
{
    var tmdbApiKey = "88740fcede037c6631f0d94c508f0454";
    var tmdbUrl = $"https://api.themoviedb.org/3/movie/popular?api_key={tmdbApiKey}&language=pt-BR";

    var tmdbResponse = await _httpClient.GetAsync(tmdbUrl);
    
    if (!tmdbResponse.IsSuccessStatusCode)
    {
        return BadRequest(new { message = "Erro ao buscar filmes populares na API do TMDB" });
    }

    var tmdbContent = await tmdbResponse.Content.ReadAsStringAsync();
    var tmdbData = JObject.Parse(tmdbContent);

            if (tmdbData["results"] is not JArray results || !results.Any())
            {
                return NotFound(new { message = "Nenhum filme encontrado" });
            }

            var top9 = results
        .Take(9)
        .Select(m => new
        {
        Id = (int)m["id"]!,
        Title = (string)m["title"]!,
        PosterPath = $"https://image.tmdb.org/t/p/w500{m["poster_path"]}",
        ReleaseDate = (string)m["release_date"]!,
        Rating = (double)m["vote_average"]!
        })
        .ToList();

    return Ok(top9);
}
[HttpGet("top-rated")]
public async Task<IActionResult> GetTopRatedMovies()
{
    var tmdbApiKey = "88740fcede037c6631f0d94c508f0454";
    var tmdbUrl = $"https://api.themoviedb.org/3/movie/top_rated?api_key={tmdbApiKey}&language=pt-BR";

    var tmdbResponse = await _httpClient.GetAsync(tmdbUrl);
    
    if (!tmdbResponse.IsSuccessStatusCode)
    {
        return BadRequest(new { message = "Erro ao buscar filmes populares na API do TMDB" });
    }

    var tmdbContent = await tmdbResponse.Content.ReadAsStringAsync();
    var tmdbData = JObject.Parse(tmdbContent);

            if (tmdbData["results"] is not JArray results || !results.Any())
            {
                return NotFound(new { message = "Nenhum filme encontrado" });
            }

            var top9 = results
        .Take(9)
        .Select(m => new
        {
        Id = (int)m["id"]!,
        Title = (string)m["title"]!,
        PosterPath = $"https://image.tmdb.org/t/p/w500{m["poster_path"]}",
        ReleaseDate = (string)m["release_date"]!,
        Rating = (double)m["vote_average"]!
        })
        .ToList();

    return Ok(top9);
}
        [HttpGet("{title}")]
     public async Task<ActionResult<MovieModel>> GetMovie(string title)
     {
          if (string.IsNullOrWhiteSpace(title))
            return BadRequest(new {message="Título inválido"});

          var tmdbApiKey = "88740fcede037c6631f0d94c508f0454"; 
          var tmdbUrl = $"https://api.themoviedb.org/3/search/movie?query={Uri.EscapeDataString(title)}&api_key={tmdbApiKey}&language=pt-BR";

          var tmdbResponse = await _httpClient.GetAsync(tmdbUrl);
          
          if(!tmdbResponse.IsSuccessStatusCode)
          {
            return BadRequest(new {message="Erro ao buscar filme na API do TMDB"});
          }
          var tmdbContent = await tmdbResponse.Content.ReadAsStringAsync();
          var tmdbData = JObject.Parse(tmdbContent);

          var tmdbResults = tmdbData["results"]?.FirstOrDefault();
          if(tmdbResults == null){
            return NotFound(new {message="Filme não encontrado"});
          }
          var tmdbId = (int)tmdbResults["id"]!;
          var existingMovie = await _context.Movies
            .FirstOrDefaultAsync(m => m.TMDBId == tmdbId);
           if (existingMovie != null) return Ok(existingMovie);


          var tmdbTitle = (string)tmdbResults["title"]!;
          var tmdbOriginalTitle = (string)tmdbResults["original_title"]!;
          var tmdbOverview = (string)tmdbResults["overview"]!;
          var tmdbPosterPath = (string)tmdbResults["poster_path"]!;
         
           var omdbApiKey = "3d49971e";
          var omdbUrl = $"http://www.omdbapi.com/?t={Uri.EscapeDataString(tmdbOriginalTitle!)}&apikey={omdbApiKey}";
           var omdbResponse = await _httpClient.GetAsync(omdbUrl);
            if (!omdbResponse.IsSuccessStatusCode)
              {
                  return BadRequest(new {message="Erro ao buscar filme na API do OMDB"});
              }

          var omdbContent = await omdbResponse.Content.ReadAsStringAsync();
          var omdbData = JObject.Parse(omdbContent);

          var omdbYear = omdbData["Year"]?.ToString();
          int? year = null;
          if (int.TryParse(omdbYear, out int parsedYear))
          year = parsedYear;
          var omdbGenre = (string)omdbData["Genre"]!;
          var omdbImdbRating = (string)omdbData["imdbRating"]!;
          var omdbPoster = (string)omdbData["Poster"]!;
          var omdbRatings = omdbData["Ratings"] as JArray;
          var runtimeString = omdbData["Runtime"]?.ToString();
          int? omdbRuntime = null;
            if (!string.IsNullOrEmpty(runtimeString))
            {
            
                var digits = new string(runtimeString.Where(char.IsDigit).ToArray());
                if (int.TryParse(digits, out int parsedRuntime))
                {
                    omdbRuntime = parsedRuntime;
                }
            }
          var omdbRottenRating = omdbRatings?.FirstOrDefault(r => (string)r["Source"]! == "Rotten Tomatoes")?["Value"]?.ToString();

         var newMovie = new MovieModel
            {
                TMDBId = tmdbId,
                Title = tmdbTitle,
                OriginalTitle = tmdbOriginalTitle,
                Overview = tmdbOverview,
                Runtime = omdbRuntime,
                FilePath = $"https://image.tmdb.org/t/p/w500{tmdbPosterPath}",
                PosterPath = omdbPoster,
                Year = !string.IsNullOrEmpty(omdbYear) ? int.Parse(omdbYear) : null,
                Genre = omdbGenre?.Split(", ").ToList(),
                IMDBRating = !string.IsNullOrEmpty(omdbImdbRating) ? decimal.Parse(omdbImdbRating) : null,
                RottenRating = !string.IsNullOrEmpty(omdbRottenRating)
                  ? int.Parse(omdbRottenRating.TrimEnd('%'))
                  : null,

            };
            try
          {
              _context.Movies.Add(newMovie);
              await _context.SaveChangesAsync();
          }
          catch (DbUpdateException)
            {
              
              return Conflict(new {message = "Erro ao adicionar filme no banco."});
          }

          return Ok(newMovie); 
     }

}
}