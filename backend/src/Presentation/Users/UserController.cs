
using System.Security.Claims;
using backend.src.Core.DTOs.Requests;
using backend.src.Core.Entities;
using backend.src.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Presentation.Users
{

[ApiController]
[Route("api/[controller]")]
public class UserController(AppDbContext context) : ControllerBase
  {
        private readonly AppDbContext _context = context;

        [HttpGet("total-hours-watch")]
        public async Task<ActionResult<int>> GetTotalHours(){
            try {

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");         

            if (userIdString == null || !int.TryParse(userIdString, out int userId)) 
                return Unauthorized(new {message ="Usuário não autenticado"});

            var totalMinutes = await _context.UserMovies
            .Where(u => u.UserId == userId)
            .Join(_context.Movies,
            userMovie => userMovie.MovieId,
            movie => movie.Id,
            (userMovie, movie) => movie.Runtime)
            .SumAsync(runtime => runtime ?? 0);

            int totalHours = totalMinutes / 60;
            return Ok(totalHours);
             
            }
            catch (Exception) {
                return StatusCode(500, "Erro interno no servidor");

            }
        }

        [HttpGet("total-movies")]
        public async Task<ActionResult<int>> GetTotalUserMovies(){
             var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");         

            if (userIdString == null || !int.TryParse(userIdString, out int userId)) 
                return Unauthorized(new {message ="Usuário não autenticado"});
            var totalMovies = await _context.UserMovies.Where(x => x.UserId == userId).CountAsync();
            return Ok(totalMovies);
            
        }

        [HttpGet]
        public async Task<ActionResult<UserModel>> SearchUsers(){
            var users = await _context.Users.Take(1).ToListAsync();
            return Ok(users);
        }
        [HttpGet("get-username")]
        [Authorize]
        public async Task<ActionResult<string>> GetUserName()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");         

            if (userIdString == null || !int.TryParse(userIdString, out int userId)) 
                return Unauthorized("Token inválido ou expirado.");
            
            var user = await _context.Users.FindAsync(userId);
            Console.WriteLine($"Buscando usuário ID: {userId}");
            Console.WriteLine($"Usuário encontrado: {user != null}");
            return user == null ? NotFound("Usuário não encontrado.") : Ok(new { userName = user.User });
        }

      [HttpPost]
      public async Task<ActionResult<UserModel>> RegisterUser(UserModel user){
        bool userExists = await _context.Users.AnyAsync(u => u.Email == user.Email);
        if (userExists) return Conflict(new {message = "O E-mail informado já está em uso"});
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(SearchUsers), new {id = user.Id}, user);
      }
       
        [HttpPost("movies/{movieId}")]
        [Authorize]
        public async Task<ActionResult> AddMovieToUser(int movieId)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");         
            if (!int.TryParse(userIdString, out int userId)) return BadRequest("ID do usuário inválido.");
            Console.WriteLine($"UserId extraído: {userId}");
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null) return NotFound(new {message = "Filme não encontrado."});
            var existingRelation = await _context.UserMovies.AnyAsync(um => um.UserId == userId && um.MovieId == movieId);
            if (existingRelation) return Conflict(new {message = "Filme já está na sua lista."});
            var userMovie = new UserMovie
            {
                UserId = userId,
                MovieId = movieId,
                DateAdded = DateTime.UtcNow
            };
            _context.UserMovies.Add(userMovie);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Filme adicionado com sucesso" });
        }
        [HttpDelete("movies/{movieId}")]
        [Authorize]
        public async Task<ActionResult> RemoveMovieFromUser(int movieId)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

            if (!int.TryParse(userIdString, out int userId))
                return BadRequest("ID do usuário inválido.");

            var userMovie = await _context.UserMovies
                .FirstOrDefaultAsync(um => um.UserId == userId && um.MovieId == movieId);
                
            if (userMovie == null)
                return NotFound(new { message = "Filme não encontrado na sua lista." });

            _context.UserMovies.Remove(userMovie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Filme removido com sucesso." });
        }



        [HttpGet("movies-list")]
        [Authorize]
        public async Task<IActionResult> GetUserMovies()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");     
            if (!int.TryParse(userIdString, out int userId)) return BadRequest("ID do usuário inválido.");
            var user = await _context.Users
                .Include(u => u.UserMovies!)
                .ThenInclude(um => um.Movie)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound("Usuário não encontrado");
            var movies = user.UserMovies!
            .OrderByDescending(um => um.DateAdded)
            .Where(um => um.Movie != null)
            .Select((um, index) => new MovieDTO
            {
                Id = index + 1,
                MovieId = um.MovieId,
                Title = um.Movie!.Title,
                Year = um.Movie.Year,
                Genre = um.Movie.Genre,
                IMDBRating = um.Movie.IMDBRating,
                RottenRating = um.Movie.RottenRating,
                FilePath = um.Movie.FilePath,
                Runtime = um.Movie.Runtime,

            })
            .ToList();
            Console.WriteLine($"Número de filmes encontrados: {movies.Count}");
            return Ok(movies);
        }
    }
  }
