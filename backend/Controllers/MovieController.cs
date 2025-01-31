using backend.data;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
namespace backend.controllers{


[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
  private readonly AppDbContext _context;  
   private readonly HttpClient _httpClient;


      public MovieController(AppDbContext context, HttpClient httpClient)  {
        _context = context;
        _httpClient = httpClient;
      }


     [HttpGet("{title}")]
     public async Task<ActionResult<MovieModel>> GetMovie(string title)
     {
          if (string.IsNullOrWhiteSpace(title))
            return BadRequest("Título inválido.");

          var existingMovie = await _context.Movies
            .FirstOrDefaultAsync(m => EF.Functions.ILike(m.Title, title));
          if (existingMovie != null)
            return Ok(existingMovie);

          var tmdbApiKey = "88740fcede037c6631f0d94c508f0454"; 
          var tmdbUrl = $"https://api.themoviedb.org/3/search/movie?query={Uri.EscapeDataString(title)}&api_key={tmdbApiKey}&language=pt-BR";

          var tmdbResponse = await _httpClient.GetAsync(tmdbUrl);
          
          if(!tmdbResponse.IsSuccessStatusCode)
          {
            return BadRequest("Erro ao buscar filmes na API");
          }
          var tmdbContent = await tmdbResponse.Content.ReadAsStringAsync();
          var tmdbData = JObject.Parse(tmdbContent);

          var tmdbResults = tmdbData["results"]?.FirstOrDefault();
          if(tmdbResults == null){
            return NotFound("Filme não encontrado.");
          }
          var tmdbId = (int)tmdbResults["id"];
          var tmdbTitle = (string)tmdbResults["title"];
          var tmdbOriginalTitle = (string)tmdbResults["original_title"];
          var tmdbOverview = (string)tmdbResults["overview"];
          var tmdbPosterPath = (string)tmdbResults["poster_path"];
         
           var omdbApiKey = "3d49971e";
          var omdbUrl = $"http://www.omdbapi.com/?t={Uri.EscapeDataString(tmdbOriginalTitle)}&apikey={omdbApiKey}";
           var omdbResponse = await _httpClient.GetAsync(omdbUrl);
            if (!omdbResponse.IsSuccessStatusCode)
              {
                  return BadRequest("Erro ao buscar informações do filme na API OMDB.");
              }

          var omdbContent = await omdbResponse.Content.ReadAsStringAsync();
          var omdbData = JObject.Parse(omdbContent);

          var omdbYear = omdbData["Year"]?.ToString();
          int? year = null;
          if (int.TryParse(omdbYear, out int parsedYear))
          year = parsedYear;
          var omdbGenre = (string)omdbData["Genre"];
          var omdbImdbRating = (string)omdbData["imdbRating"];
          var omdbPoster = (string)omdbData["Poster"];
          var omdbRatings = omdbData["Ratings"] as JArray;
          var omdbRuntime = omdbData["Runtime"]?.ToObject<int?>();
          var omdbRottenRating = omdbRatings?.FirstOrDefault(r => (string)r["Source"] == "Rotten Tomatoes")?["Value"]?.ToString();

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
                RottenRating = !string.IsNullOrEmpty(omdbRottenRating) ? decimal.Parse(omdbRottenRating.TrimEnd('%')) / 100 : null
            };
            try
          {
              _context.Movies.Add(newMovie);
              await _context.SaveChangesAsync();
          }
          catch (DbUpdateException ex)
          {
              // Log do erro
              return Conflict("Filme já existe no banco.");
          }

          return Ok(newMovie); 
     }

}
}