using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core
{
    public interface IFilesService
    {
        public Task<List<FileDto>> GetListAsync();
      public Task<FileDto> GetByIdAsync(int id);
      public Task<bool> UpdateAsync(int id, FileDto value);
      public Task<bool> DeleteAsync(int id);
        public Task<FileDto> AddAsync(FileDto value);
        Task<List<FileDto>> GetByCategoryDataAsync(int categoryId);

    }
}
