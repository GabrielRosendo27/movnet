using backend.models;

namespace backend.src.Core.Interfaces.Repositories
{
public interface IUserRepository
{
     Task<UserModel?> GetByEmailAsync(string email);
    Task<UserModel?> GetByIdAsync(int id);
    void Update(UserModel user);
    Task SaveChangesAsync();
}

}