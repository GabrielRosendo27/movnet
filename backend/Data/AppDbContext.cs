using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.data
{
  public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) {
       
        public DbSet<UserModel> Users { get; set; } = null!;

  }
}