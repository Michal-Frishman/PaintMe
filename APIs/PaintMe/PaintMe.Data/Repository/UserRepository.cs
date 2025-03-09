using PaintMe.Core.Entities;
using PaintMe.Core;

namespace PaintMe.Data.Repository
{
    public class UsersRepository : IRepository<User>
    {
        private readonly DataContext _dataContext;

        public UsersRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<User> GetAllData()
        {
            return _dataContext.Users.ToList();
        }

        public bool AddData(User user)
        {
            try
            {
                user.CreatedAt = DateTime.Now;
                _dataContext.Users.Add(user);
                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public User GetByIdData(int id)
        {
            return _dataContext.Users.FirstOrDefault(u => u.Id == id);
        }

        public bool RemoveItemFromData(int id)
        {
            try
            {
                var item = GetByIdData(id);
                if (item == null)
                {
                    return false;
                }
                _dataContext.Users.Remove(item);
                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateData(int id, User user)
        {
            try
            {
                var userToUpdate = GetByIdData(id);
                if (userToUpdate == null)
                {
                    return false;
                }
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.Email = user.Email;
                userToUpdate.Password = user.Password;
                userToUpdate.UpdatedAt = DateTime.Now;
                userToUpdate.UpdatedBy = user.UpdatedBy;

                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool isExist(int id)
        {
            return _dataContext.Users.Any(u => u.Id == id);
        }
    }
}
