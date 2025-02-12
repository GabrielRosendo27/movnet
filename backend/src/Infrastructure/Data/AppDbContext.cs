
using backend.src.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Infrastructure.Data
{
  
  public class AppDbContext : DbContext 
  { 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<UserMovie>()
        .HasKey(um => new { um.UserId, um.MovieId });

    modelBuilder.Entity<UserMovie>()
        .HasOne(um => um.User)
        .WithMany(u => u.UserMovies)
        .HasForeignKey(um => um.UserId);

    modelBuilder.Entity<UserMovie>()
        .HasOne(um => um.Movie)
        .WithMany(m => m.UserMovies)
        .HasForeignKey(um => um.MovieId);
}
    public AppDbContext(DbContextOptions options) : base(options){}
    public DbSet<UserModel> Users { get; set;} = null!;
    public DbSet<MovieModel> Movies { get; set;} = null!;
    public DbSet<UserMovie> UserMovies { get; set; }
    
  }
  
}