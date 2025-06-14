
using PaintMe.Core.DTOs;

namespace PaintMe.Core
{
    public interface IRoleService
    {
        public Task<RoleDto> GetRoleByNameAsync(string roleName);
        public Task<IEnumerable<RoleDto>> GetRolesAsync();
        public Task<bool> AddRoleAsync(RoleDto role);
        public Task<bool> DeleteRoleAsync(int id);

    }
}
