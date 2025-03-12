using PaintMe.Core.Entities;

namespace PaintMe.Core
{
    public interface IUserRolesRepository
    {
     public  Task<UserRole> AddDataAsync(UserRole userRole);
     public  Task<bool> RemoveItemFromDataAsync(int id);
     public  Task<List<UserRole>> GetAllDataAsync();
     public  Task<UserRole> GetByUserIdAsync(int id);
     public    Task<UserRole> GetByIdDataAsync(int id);
        public Task<bool> UpdateDataAsync(int id, UserRole userRole);
    }
}
