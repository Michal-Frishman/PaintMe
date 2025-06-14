


using Microsoft.EntityFrameworkCore;
using PaintMe.Core;
using PaintMe.Core.Entities;

namespace PaintMe.Data.Repository
{
    public class RoleRepository : IRoleRepository
    {
        readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        //GET
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }


        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var res = await _context.Roles.Where(role => role.RoleName == roleName).FirstOrDefaultAsync();
            return res;
        }
              
        
        public async Task<bool> AddRoleAsync(Role role)
        {
            try
            {
                _context.Roles.Add(role);

                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                throw new Exception("failed to add role");
            }
        }


        public async Task<bool> DeleteRoleAsync(int id)
        {
            try
            {
                var role = await _context.Roles.FirstOrDefaultAsync(role => role.Id == id);
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
                return true;

            }
            catch
            {
                return false;
            }
        }
    }
}
