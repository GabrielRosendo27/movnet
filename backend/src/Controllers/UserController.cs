using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.src.controllers
{

[ApiController]
[Route("api/[controller]")]
public class UserController(AppDbContext context) : ControllerBase
  {
      private readonly AppDbContext _context = context;

        [HttpGet]
      
      public ActionResult<List<UserModel>> SearchUsers(){
        var users = _context.Users.Take(1).ToList();
        return Ok(users);
      }
      
      
      [HttpGet("main")]
      [Authorize]
      public ActionResult<object> GetUserDetails()
{
    var authHeader = HttpContext.Request.Headers.Authorization.ToString();
    if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
    {
        return Unauthorized("Token não encontrado ou inválido.");
    }

    var token = authHeader["Bearer ".Length..].Trim();
    var handler = new JwtSecurityTokenHandler();

    try
    {
         var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
        var userIdString = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (userIdString == null || !int.TryParse(userIdString, out int userId))
        {
            return Unauthorized("Token inválido ou expirado.");
        }

        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
        {
            return NotFound("Usuário não encontrado.");
        }

        return Ok(new { userName = user.User });
    }
    catch (Exception ex)
    {
        return BadRequest($"Erro ao processar o token: {ex.Message}");
    }
}




      [HttpPost]
      public async Task<ActionResult<UserModel>> RegisterUser(UserModel user){
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(SearchUsers), new {id = user.Id}, user);
      }
      
   

      
       
        [HttpPost("movies/{movieId}")]
        [Authorize]
        public async Task<IActionResult> AddMovieToUser(int movieId)
        {
            // Obter o usuário autenticado
            // var userIdString = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            // if (!int.TryParse(userIdString, out int userId))
            //      return BadRequest(new {message = "ID do usuário inválido."});
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                       User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");         

                 if (!int.TryParse(userIdString, out int userId))
                    {
                        return BadRequest("ID do usuário inválido.");
                    }
            Console.WriteLine($"UserId extraído: {userId}");


            // Verificar se o filme existe
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
                return NotFound(new {message = "Filme não encontrado."});

            // Verificar se já está na lista
            var existingRelation = await _context.UserMovies
                .AnyAsync(um => um.UserId == userId && um.MovieId == movieId);

            if (existingRelation)
                return Conflict(new {message = "Filme já está na sua lista."});

            // Adicionar relação
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
        [HttpGet("movies")]
        [Authorize]
        public async Task<IActionResult> GetUserMovies()
        {
             Console.WriteLine("Todas as claims do usuário:");

                foreach (var claim in User.Claims)
                {
                    Console.WriteLine($"{claim.Type}: {claim.Value}");
                }

             var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                       User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
      
            Console.WriteLine($"--> {userIdString} <--");
            

                 if (!int.TryParse(userIdString, out int userId))
                    {
                        return BadRequest("ID do usuário inválido.");
                    }

            var user = await _context.Users
                .Include(u => u.UserMovies)
                .ThenInclude(um => um.Movie)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound("Usuário não encontrado");

            var movies = user.UserMovies
            .OrderByDescending(um => um.DateAdded)
            .Select(um => new MovieDTO
            {
                Id = um.Movie.Id,
                Title = um.Movie.Title,
                OriginalTitle = um.Movie.OriginalTitle,
                Overview = um.Movie.Overview,
                Year = (int)um.Movie.Year
                // Mapear outras propriedades conforme necessário
            })
            .ToList();

            return Ok(movies);
        }
    }
  }
