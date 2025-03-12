using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Core
{
    public interface IFilesRepository
    {
      public Task<List<File>> GetAllDataAsync();
      public Task<File> GetByIdDataAsync(int id);
      public Task<File> AddDataAsync(File t);
      public Task<bool> UpdateDataAsync(int id, File item);
        public Task<bool> RemoveItemFromDataAsync(int id);
    }
}
