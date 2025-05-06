
using PaintMe.Core.Entities;

namespace PaintMe.Core
{
    public interface IUserRepository
    {
        public Task<List<User>> GetAllDataAsync();
        public Task<User> GetByIdDataAsync(int user);
        public Task<User> AddDataAsync(User user);
        public Task<bool> UpdateDataAsync(int id, User user);
        public Task<bool> RemoveItemFromDataAsync(int id);
        Task<User> FindUserByEmailAsync(string email);
        Task<Dictionary<string, int>> GetNewUsersPerMonthAsync();
        Task<User> LoginAsync(string email, string password);
        Task<bool> UpdateRoleAsync(int id, Role role);

    }
}
