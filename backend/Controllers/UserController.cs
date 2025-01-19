using backend.data;
using backend.models;
using Microsoft.AspNetCore.Mvc;
namespace backend.controllers
{

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
  {
      private readonly AppDbContext _context;  

      public UserController(AppDbContext context)  {
        _context = context;
      }

      [HttpGet]
      
      public ActionResult<List<UserModel>> SearchUsers(){
        var users = _context.Users.ToList();
        return Ok(users);
      }

      
      [HttpPost]
      public async Task<ActionResult<UserModel>> RegisterUser(UserModel user){
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(SearchUsers), new {id = user.Id}, user);
      }
  }
}