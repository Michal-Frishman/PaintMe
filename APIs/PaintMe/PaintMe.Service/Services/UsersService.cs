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

        public List<UserDto> GetList()
        {
            var data = _usersRepository.GetAllData();
            return _mapper.Map<List<UserDto>>(data);
        }

        public UserDto GetById(int id)
        {
            var data = _usersRepository.GetByIdData(id);
            Console.WriteLine(data == null ? "User not found" : "User found");
            var result = _mapper.Map<UserDto>(data);
            Console.WriteLine(result);
            return result;
        }

        public bool Update(int id, UserDto user)
        {
            var item = GetById(id);
            if (item == null) return false;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            return _usersRepository.UpdateData(id, data);
        }

        public bool Add(UserDto user)
        {
            if (_usersRepository.GetByIdData(user.Id) != null)
                return false;
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            return _usersRepository.AddData(data);
        }

        public bool Delete(int id)
        {
            return _usersRepository.RemoveItemFromData(id);
        }
    }
}
