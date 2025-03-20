using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Data.Repository
{
    public class FilesRepository : IFilesRepository
    {
        private readonly DataContext _dataContext;

        public FilesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<File>> GetAllDataAsync()
        {
            return await _dataContext.Files.ToListAsync();
        }

        public async Task<File> AddDataAsync(File file)
        {
            try
            {
                file.CreatedAt = DateTime.Now;
                await _dataContext.Files.AddAsync(file);
                await _dataContext.SaveChangesAsync();
                return file;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public async Task<File> GetByIdDataAsync(int id)
        {
            return await _dataContext.Files.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            try
            {
                var item = await GetByIdDataAsync(id);
                if (item == null)
                {
                    return false;
                }
                _dataContext.Files.Remove(item);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateDataAsync(int id, File file)
        {
            try
            {
                var fileToUpdate = await GetByIdDataAsync(id);
                if (fileToUpdate == null)
                {
                    return false;
                }
                fileToUpdate.Name = file.Name;
                fileToUpdate.Category = file.Category;
                fileToUpdate.FileUrl = file.FileUrl;
                fileToUpdate.UpdatedAt = DateTime.Now;
                fileToUpdate.UpdatedBy = file.UpdatedBy;

                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<List<File>> GetByCategoryDataAsync(int categoryId)
        {
            return await _dataContext.Files.Where(f => f.CategoryId == categoryId).ToListAsync();
        }
    }
}


