using PaintMe.Core.Entities;

namespace PaintMe.Core
{

    public interface IUserRoleService:IUserService
    {
        public Task<UserRole> AddAsync(string role, int userId);

    }
}
