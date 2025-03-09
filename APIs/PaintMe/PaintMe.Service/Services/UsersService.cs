using PaintMe.Core;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Service.Services
{
    public class UsersService:IService<User>
    {
        readonly IRepository<User> _usersRepository;
        public UsersService(IRepository<User> dataContext)
        {
            _usersRepository = dataContext;
        }
        public List<User> GetList()
        {
            var data = _usersRepository.GetAllData();
            if (data == null)
                return null;
            return data;
        }
        public User GetById(int id)
        {
            var data = _usersRepository.GetByIdData(id);
            if (data == null)
                return null;
            return data;
        }
        public bool Update(int id, User driver)
        {
            var item = GetById(id);
            if (item == null) { return false; }
            return (_usersRepository.UpdateData(id, driver) == null);
        }
        public bool Add(User driver)
        {
            var data = _usersRepository.GetByIdData(driver.Id);
            if (data != null)
                return false;
            return _usersRepository.AddData(driver);
        }
        public bool Delete(int id)
        {
            if (_usersRepository.isExist(id))
            {
                var item = GetById(id);
                return _usersRepository.RemoveItemFromData(id);
            }
            return false;
        }
    }
}
