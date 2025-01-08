using backend.models;
using Microsoft.AspNetCore.Mvc;
namespace backend.controllers
{

[ApiController]
[Route("/register")]
public class UserController : ControllerBase{
      [HttpGet]
      public ActionResult<List<UserModel>> SearchUsers(){
        return Ok();
      }
      
}
}