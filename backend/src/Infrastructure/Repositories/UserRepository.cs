
using backend.models;
using backend.src.Core.Interfaces.Repositories;
using backend.src.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Infrastructure.Repositories
{
    public class UserRepository(AppDbContext context) : IUserRepository
{
    public Task<UserModel?> GetByEmailAsync(string email) => context.Users.FirstOrDefaultAsync(u => u.Email == email);
    public Task<UserModel?> GetByIdAsync(int id) => context.Users.FirstOrDefaultAsync(u => u.Id == id);
    public void Update(UserModel user) => context.Users.Update(user);
    public Task SaveChangesAsync() => context.SaveChangesAsync();

    }
}
