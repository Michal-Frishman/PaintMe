

using Microsoft.EntityFrameworkCore;
using PaintMe.Core;
using PaintMe.Core.Entities;

namespace PaintMe.Data.Repository
{

    public class PermissionRepository : IPermissionRepository
    {
        readonly DataContext _dataContext;
        public PermissionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Permission> AddPermissionAsync(Permission permission)
        {
            try
            {
                await _dataContext.Permissions.AddAsync(permission);
                await _dataContext.SaveChangesAsync();
                return permission;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public async Task<Permission> GetPermissionByIdAsync(int id)
        {
            try
            {
                var res = await _dataContext.Permissions.FirstOrDefaultAsync(permission => permission.Id == id);
                return res;
            }
            catch (Exception)
            {
                return null;
               
            }
        }

        public async Task<Permission> GetPermissionByNameAsync(string name)
        {
             var res =await _dataContext.Permissions.FirstOrDefaultAsync(permission => permission.PermissionName == name);
            return res;
        }

        public async Task<List<Permission>> GetPermissionsAsync()
        {
            return await _dataContext.Permissions.ToListAsync();
        }

        public async Task<bool> RemovePermissionAsync(int id)
        {
            try
            {
                var res = await _dataContext.Permissions.FirstOrDefaultAsync(p => p.Id == id);
                if (res == null) return false;
                else
                {
                    _dataContext.Permissions.Remove(res);
                    await _dataContext.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<Permission> UpdatePermissionAsync(int id, Permission permission)
        {
            try
            {
                var res = await _dataContext.Permissions.FirstOrDefaultAsync(p => p.Id == id);
                if (res != null)
                {
                    res.PermissionName = permission.PermissionName ?? res.PermissionName;
                    res.Description = permission.Description ?? res.Description;
                    await _dataContext.SaveChangesAsync();
                }
                return res;
            }
            catch (Exception)
            {

                return null;
            }
        }
    }
}
