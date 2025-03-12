using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore; // Ensure you have this using directive for EF Core

namespace PaintMe.Data.Repository
{
    public class RoleRepository : IRoleRepository
    {
        protected readonly DataContext _dataContext;

        public RoleRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<Role> AddDataAsync(Role role)
        {
            role.CreatedAt = DateTime.UtcNow; // Set CreatedAt before adding
            await _dataContext.Roles.AddAsync(role);
            await _dataContext.SaveChangesAsync(); // Persist changes
            return role; // Return true to indicate success
        }

        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            var role = await GetByIdDataAsync(id);
            if (role != null)
            {
                _dataContext.Roles.Remove(role);
                await _dataContext.SaveChangesAsync(); // Persist changes
                return true; // Return true to indicate success
            }
            return false; // Return false if the role was not found
        }

        public async Task<List<Role>> GetAllDataAsync()
        {
            return await _dataContext.Roles.ToListAsync(); // Use ToListAsync
        }

        public async Task<Role> GetByIdDataAsync(int id)
        {
            return await _dataContext.Roles.FindAsync(id);
        }

        public async Task<bool> UpdateDataAsync(int id, Role role)
        {
            Role existingRole = await GetByIdDataAsync(id);
            if (existingRole != null)
            {
                existingRole.RoleName = role.RoleName;
                existingRole.Description = role.Description;
                existingRole.UpdatedAt = DateTime.UtcNow;

                await _dataContext.SaveChangesAsync(); // Persist changes
                return true; // Return true to indicate success
            }
            return false; // Return false if the role was not found
        }

        // Optional: If you want to keep the method to get role by name
        public async Task<Role> GetIdByRoleAsync(string roleName)
        {
            return await _dataContext.Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
        }
    }
}
