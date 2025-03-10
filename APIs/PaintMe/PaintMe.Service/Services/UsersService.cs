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
            return _mapper.Map<UserDto>(data);
             
        }

        public bool Update(int id, UserDto user)
        {
            var item = GetById(id);
            if (item == null) return false;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            var userToUpdate= _mapper.Map<User>(item);
            return _usersRepository.UpdateData(id, data,userToUpdate);
        }

        public bool Add(UserDto user)
        {
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<User>(user);
            return _usersRepository.AddData(data);
        }

        public bool Delete(int id)
        {
            var item = GetById(id);
            if (item == null) return false;
            var itemToDelete= _mapper.Map<User>(item);
            return _usersRepository.RemoveItemFromData(id);
        }
    }
}
