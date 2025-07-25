﻿using PaintMe.Core.Entities;
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
        public  Task<List<File>> GetDataByUserId(int id);
        Task<List<File>> GetFilesByUserOrAdminsAsync(int userId);
    Task<List<File>> GetFilesByAdminsOnlyAsync();

        public Task<File> AddDataAsync(File t);
      public Task<bool> UpdateDataAsync(int id, File item);
        public Task<bool> RemoveItemFromDataAsync(int id);
         Task<List<File>> GetByCategoryDataAsync(int categoryId, int userId);

    }
}
