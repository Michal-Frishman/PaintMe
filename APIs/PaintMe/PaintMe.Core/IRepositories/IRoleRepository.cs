
using PaintMe.Core.Entities;

namespace PaintMe.Core
{
    public interface IRoleRepository
    {

        public Task<IEnumerable<Role>> GetRolesAsync();
        public Task<Role> GetRoleByNameAsync(string roleName);
        public Task<bool> AddRoleAsync(Role role);
        public Task<bool> DeleteRoleAsync(int id);


    }
}
