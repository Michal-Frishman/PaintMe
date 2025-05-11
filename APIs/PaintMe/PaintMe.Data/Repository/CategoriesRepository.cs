using Microsoft.EntityFrameworkCore;
using PaintMe.Core;
using PaintMe.Core.Entities;
using PaintMe.Service.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Data.Repository
{
    public class CategoriesRepository : ICategoryRepository
    {
        readonly DataContext _datacontext;

        public CategoriesRepository(DataContext context)
        {
            _datacontext = context;
        }

        public async Task<List<Category>> GetAllDataAsync()
        {
            return await _datacontext.Categories.ToListAsync();
        }

        public async Task<Category> GetByIdDataAsync(int id)
        {
            return await _datacontext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> AddDataAsync(Category category)
        {
            try
            {
                _datacontext.Categories.Add(category);
                await _datacontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateDataAsync(int id, Category item)
        {
            var existingCategory = _datacontext.Categories.FirstOrDefault(c => c.Id == id);
            if (existingCategory == null) return false;

            existingCategory.Name = item.Name;
            existingCategory.UpdatedBy = item.UpdatedBy;
            existingCategory.UpdatedAt = DateTime.Now;

            try
            {
                await _datacontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            var category = _datacontext.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null) return false;

            try
            {
                _datacontext.Categories.Remove(category);
                await _datacontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
