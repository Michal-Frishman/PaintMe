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
        readonly IRoleRepository _roleRepository;
        public UsersService(IUserRepository userRepository, IMapper mapper, IRoleRepository roleRepository)
        {
            _usersRepository = userRepository;
            _mapper = mapper;
            _roleRepository = roleRepository;
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
            var user2 = _mapper.Map<User>(user);
            user2.UpdatedBy = id;
            user.UpdatedAt = DateTime.Now;

            var data = _mapper.Map<User>(user);
            return await _usersRepository.UpdateDataAsync(id, data);
        }

        public async Task<UserDto> AddAsync(UserDto user)
        {
            var a = _mapper.Map<User>(user);
            a.CreatedAt = DateTime.Now;
            a.UpdatedAt = DateTime.Now;
            a.CreatedBy = 1;
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

            var res = await _usersRepository.FindUserByEmailAsync(email);
            var user = _mapper.Map<User>(res);
            if (user == null || !user.Password.Equals(password))
            {
                return null;
            }
            //var userRole = _userrolerepository.GetByUserId(user.Id);
            if (user == null) return null;

            return user.Role.RoleName;
            //var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
            //if (userRole == null)
            //    return null;
            //return userRole.Role.RoleName;
            //return "succed!!!";
            //User user = _repository.GetByUserByEmail(email);
            //if (user == null) return "האימייל לא נמצא במערכת";

            //var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            //if (result != PasswordVerificationResult.Success)
            //{
            //    return "סיסמא שגויה";
            //}

            //var userRole = _userrolerepository.GetByUserId(user.Id);
            //if (userRole == null) return null;

            //return userRole.Role.RoleName;
        }
        public async Task<UserDto> FindUserByEmailAsync(string email)
        {
            var user = await _usersRepository.FindUserByEmailAsync(email);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
        public async Task<Dictionary<string, int>> GetNewUsersPerMonthAsync()
        {
            return await _usersRepository.GetNewUsersPerMonthAsync();
        }
        public async Task<UserDto> LoginAsync(string email, string password)
        {
            var user = await _usersRepository.LoginAsync(email, password);
            return _mapper.Map<UserDto>(user);
        }


        //put

        public async Task<UserDto> RegisterAsync(UserDto user, string[] roles)
        {
            var userEmail = await FindUserByEmailAsync(user.Email);
            if (userEmail != null)
            {
                return null;
            }
            var res = await _usersRepository.AddDataAsync(_mapper.Map<User>(user));
            if (res != null)
            {
                for (int i = 0; i < roles.Length; i++)
                {
                    await _usersRepository.UpdateRoleAsync(res.Id, await _roleRepository.GetRoleByNameAsync(roles[i]));
                }
                //await _usersActivityRepository.LogActivityAsync(res.Id, "Register");
            }
            return _mapper.Map<UserDto>(res);
        }

        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            return await _usersRepository.UpdateRoleAsync(id, role);
        }
    }
}
