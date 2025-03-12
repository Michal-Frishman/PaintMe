using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core
{
    public interface IRoleRepository
    {
      public Task<List<Role>> GetAllDataAsync();
      public Task<Role> GetByIdDataAsync(int id);
      public Task<Role> AddDataAsync(Role t);
      public Task<bool> UpdateDataAsync(int id, Role item);
        public Task<bool> RemoveItemFromDataAsync(int id);
    }
}
