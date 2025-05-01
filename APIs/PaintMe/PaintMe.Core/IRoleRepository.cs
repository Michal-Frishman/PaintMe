
using PaintMe.Core.Entities;

namespace PaintMe.Core
{
    public interface IRoleRepository
    {

        public Task<bool> IsRoleHasPermissinAsync(string roleName, string permission);
        public Task<IEnumerable<Role>> GetRolesAsync();
        public Task<Role> GetRoleByNameAsync(string roleName);
        public Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission);
        public Task<bool> AddRoleAsync(Role role);
        public Task<bool> UpdateRoleAsync(int id, Role role);
        public Task<bool> DeleteRoleAsync(int id);


    }
}
