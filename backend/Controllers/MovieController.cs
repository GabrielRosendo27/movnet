using backend.data;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
namespace backend.controllers{


[ApiController]
[Route("[controller]")]
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
         var existingMovie = _context.Movies.FirstOrDefault(m => m.Title.ToLower() == title.ToLower());
          if (existingMovie != null)
          {
            return Ok(existingMovie);
          }
          var tmdbApiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODc0MGZjZWRlMDM3YzY2MzFmMGQ5NGM1MDhmMDQ1NCIsIm5iZiI6MTcxODU4ODgzNS43MTIsInN1YiI6IjY2NmY5NWEzM2IwZTYzMjk5YWQxZDE5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c6Na8v6qRK9sXyZdgbyR3E0gwCyvQLpBS3lPUcJRYj4"; 
          var tmdbUrl = $"https://api.themoviedb.org/3/search/movie?query={Uri.EscapeDataString(title)}&api_key={tmdbApiKey}";

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
          var tmdbRuntime = tmdbResults["runtime"]?.ToObject<int?>();
          var tmdbPosterPath = (string)tmdbResults["poster_path"];
         
         var newMovie = new MovieModel
            {
                TMDBId = tmdbId,
                Title = tmdbTitle,
                OriginalTitle = tmdbOriginalTitle,
                Overview = tmdbOverview,
                Runtime = tmdbRuntime,
                FilePath = $"https://image.tmdb.org/t/p/w500{tmdbPosterPath}",
                // Year = !string.IsNullOrEmpty(omdbYear) ? int.Parse(omdbYear) : null,
                // Genre = omdbGenre?.Split(", ").ToList(),
                // IMDBRating = !string.IsNullOrEmpty(omdbImdbRating) ? decimal.Parse(omdbImdbRating) : null,
                // RottenRating = !string.IsNullOrEmpty(omdbRottenRating) ? decimal.Parse(omdbRottenRating.TrimEnd('%')) / 100 : null
            };
            _context.Movies.Add(newMovie);
            await _context.SaveChangesAsync();
            return Ok(newMovie);
     }

}
}