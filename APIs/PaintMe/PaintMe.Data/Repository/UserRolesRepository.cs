using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore;

namespace PaintMe.Data.Repository
{
    public class UserRoleRepository : IUserRolesRepository
    {
        protected readonly DataContext _dataContext;

        public UserRoleRepository(DataContext context)
        {
            _dataContext = context; // Assuming your DataContext has a DbSet<UserRole> property
        }

        public async Task<List<UserRole>> GetAllDataAsync()
        {
            return await _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).ToListAsync();
        }

        public async Task<UserRole> GetByIdDataAsync(int id)
        {
            return await _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).FirstOrDefaultAsync(ur => ur.Id == id);
        }

        public async Task<UserRole> AddDataAsync(UserRole userRole)
        {
            await _dataContext.AddAsync(userRole);
            return userRole;
        }

        public async Task<bool> UpdateDataAsync(int id, UserRole userRole)
        {
            UserRole existingUserRole = await GetByIdDataAsync(id);
            if (existingUserRole != null)
            {
                existingUserRole.UserId = userRole.UserId;
                existingUserRole.RoleId = userRole.RoleId;
                return true;
            }
            return false;
        }
        public async Task<UserRole> GetByUserIdAsync(int id)
        {
            return await _dataContext.UserRoles.Include(ur => ur.User).Include(ur => ur.Role).FirstOrDefaultAsync(ur => ur.UserId == id);
        }
        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            var userRole = await GetByIdDataAsync(id);
            if (userRole != null)
            {
                _dataContext.Remove(userRole);
                return true;
            }
            return false;
        }


    }
}
