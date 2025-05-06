
using PaintMe.Core.DTOs;

namespace PaintMe.Core
{
    public interface IPermissionService
    {
        public Task<PermissionDTO> AddPermissionAsync(PermissionDTO permission);
        public Task<List<PermissionDTO>> GetPermissionsAsync();
        public Task<PermissionDTO> GetPermissionByIdAsync(int id);
        public Task<PermissionDTO> GetPermissionByNameAsync(string name);

        public Task<bool> RemovePermissionAsync(int id);
        public Task<PermissionDTO> UpdatePermissionAsync(int id, PermissionDTO permission);
    }
}
