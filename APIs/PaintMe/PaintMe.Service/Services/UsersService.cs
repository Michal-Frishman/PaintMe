using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

namespace PaintMe.Service.Services
{
    public class UsersService : IService<UserDto>
    {
        readonly IRepository<User> _usersRepository;
        readonly IMapper _mapper;

        public UsersService(IMapper mapper, IRepository<User> dataContext)
        {
            _mapper = mapper;
            _usersRepository = dataContext;
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

        public async Task<bool> AddAsync(UserDto user)
        {
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            return await _usersRepository.AddDataAsync(data);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            return await _usersRepository.RemoveItemFromDataAsync(id);
        }
    }
}
