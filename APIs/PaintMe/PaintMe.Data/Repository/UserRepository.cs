using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore; // Add this for async methods

namespace PaintMe.Data.Repository
{
    public class UsersRepository : IRepository<User>
    {
        private readonly DataContext _dataContext;

        public UsersRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<User>> GetAllDataAsync()
        {
            return await _dataContext.Users.ToListAsync();
        }

        public async Task<bool> AddDataAsync(User user)
        {
            try
            {
                await _dataContext.Users.AddAsync(user);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
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
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
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
    }
}
