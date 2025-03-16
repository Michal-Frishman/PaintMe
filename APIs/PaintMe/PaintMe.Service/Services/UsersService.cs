using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using System.Text;

namespace PaintMe.Service.Services
{
    public class UsersService : IUserService
    {
        private readonly IUserRepository _usersRepository;
        private readonly IMapper _mapper;
        public UsersService(IUserRepository userRepository, IMapper mapper)
        {
            _usersRepository = userRepository;
            _mapper = mapper;
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
            user.PasswordHash = "ajdaklCJLAHCO";
            user.RoleName = "sac";
            user.Name = "";
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
        public async Task<string> AuthenticateAsync(string email, string password)
        {
            var user = await _usersRepository.FindUserByEmailAsync(email);
            var userDto=_mapper.Map<User>(user);
            if (userDto == null || !userDto.Password.Equals(password))
            {
                return null;
            }
            //var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
            //if (userRole == null)
            //    return null;
            //return userRole.Role.RoleName;
            return "succed!!!";
        }
        public async Task<UserDto> FindUserByEmailAsync(string email)
        {
            var user = await _usersRepository.FindUserByEmailAsync(email);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

    }
}
