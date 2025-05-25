using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core
{
    public interface IUserService
    {
        public Task<string> AuthenticateAsync(string username, string password);
        public Task<List<UserDto>> GetListAsync();
        public Task<UserDto> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, UserDto value);
        public Task<bool> DeleteAsync(int id);
        public Task<UserDto> AddAsync(UserDto value);
        public Task<UserDto> FindUserByEmailAsync(string email);
        Task<Dictionary<string, int>> GetNewUsersPerMonthAsync();
        public Task<bool> UpdateRoleAsync(int id, Role role);
        public Task<UserDto> LoginAsync(string email, string password);
    }
}
