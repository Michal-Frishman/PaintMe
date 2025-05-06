
using PaintMe.Core.DTOs;

namespace PaintMe.Core
{
    public interface IRoleService
    {
        public Task<bool> IsRoleHasPermissinAsync(string roleName, string permission);
        public Task<RoleDto> GetRoleByNameAsync(string roleName);
        public Task<IEnumerable<RoleDto>> GetRolesAsync();
        public Task<bool> AddPermissinForRoleAsync(string roleName, string permission);
        public Task<bool> AddRoleAsync(RoleDto role);
        public Task<bool> UpdateRoleAsync(int id, RoleDto role);
        public Task<bool> DeleteRoleAsync(int id);

    }
}
