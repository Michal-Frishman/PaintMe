using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore; // Add this for async methods

namespace PaintMe.Data.Repository
{

    public class UsersRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UsersRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<User>> GetAllDataAsync()
        {
            return await _dataContext.Users.ToListAsync()??new List<User>();
        }

        public async Task<User> AddDataAsync(User user)
        {
            try
            {
                await _dataContext.Users.AddAsync(user);
                await _dataContext.SaveChangesAsync();
                return user;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public async Task<User> GetByIdDataAsync(int id)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            try
            {
                var item = await GetByIdDataAsync(id);
                if (item == null)
                {
                    return false;
                }
                _dataContext.Users.Remove(item);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateDataAsync(int id, User user)
        {
            try
            {
                var userToUpdate = await GetByIdDataAsync(id);
                if (userToUpdate == null)
                {
                    return false;
                }
                userToUpdate.Name = user.Name;
                userToUpdate.Email = user.Email;
                userToUpdate.Password = user.Password;
                userToUpdate.UpdatedAt = DateTime.Now;
                userToUpdate.UpdatedBy = user.UpdatedBy;

                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<User> FindUserByEmailAsync(string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }




        public async Task<bool> UpdateAsync(int id, User user)
        {
            User r = await GetByIdDataAsync(id);
            if (r != null)
            {
                r.Email = user.Email;
                r.Name = user.Name;

                r.Password = user.Password;
                r.UpdatedAt = DateTime.UtcNow;
                return true;
            }
            return false;
        }

        public async Task DeleteAsync(int id)
        {
            var user = await GetByIdDataAsync(id);
            _dataContext.Users.Remove(user);


        }
        public async Task<Dictionary<string, int>> GetNewUsersPerMonthAsync()
        {
            return await _dataContext.Users
                .GroupBy(u => new { u.CreatedAt.Year, u.CreatedAt.Month })
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                .Select(g => new
                {
                    Month = $"{g.Key.Month:D2}/{g.Key.Year}",
                    Count = g.Count()
                })
                .ToDictionaryAsync(g => g.Month, g => g.Count);
        }
    }
}
