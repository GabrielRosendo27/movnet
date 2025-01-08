using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.data
{
  public class AppDbContext : DbContext 
  { 
    public AppDbContext(DbContextOptions options) : base(options){}
    public DbSet<UserModel> Users { get; set;} = null!;
  }
}