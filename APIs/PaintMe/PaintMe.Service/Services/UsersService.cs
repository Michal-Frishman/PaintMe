using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

namespace PaintMe.Service.Services
{
    public class UsersService : IUserService
    {
        private readonly IUserRepository _userRepository;
        readonly IRepository<User> _usersRepository;
        readonly IMapper _mapper;
        private readonly IUserRolesRepository _userRolesRepository;
        public UsersService(IUserRepository userRepository, IMapper mapper, IUserRolesRepository userRolesRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userRolesRepository = userRolesRepository;

        }

        public async Task<List<UserDto>> GetListAsync()
        {
            var data = await _usersRepository.GetAllDataAsync();
            return _mapper.Map<List<UserDto>>(data);
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            var data = await _usersRepository.GetByIdDataAsync(id);
            return _mapper.Map<UserDto>(data);
        }

        public async Task<bool> UpdateAsync(int id, UserDto user)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            return await _usersRepository.UpdateDataAsync(id, data);
        }

        public async Task<UserDto> AddAsync(UserDto user)
        {
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            var a = _mapper.Map<User>(user);
            var data = await _usersRepository.AddDataAsync(a);
            var x = _mapper.Map<UserDto>(data);
            return x;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            return await _usersRepository.RemoveItemFromDataAsync(id);
        }
        public async Task<string> AuthenticateAsync(string username, string password)
        {
            User user = await _userRepository.FindByUsernameAsync(username);
            if (user == null || !user.Password.Equals(password))
            {
                return null;
            }
            var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
            if (userRole == null)
                return null;
            return userRole.Role.RoleName;
        }


    }
}
