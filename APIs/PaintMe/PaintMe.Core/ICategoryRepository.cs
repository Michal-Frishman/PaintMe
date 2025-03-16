using System.Collections.Generic;
using System.Threading.Tasks;
using PaintMe.Core.Entities;

namespace PaintMe.Service.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllDataAsync();
        Task<Category> GetByIdDataAsync(int id);
        Task<bool> RemoveItemFromDataAsync(int id);
        Task<bool> UpdateDataAsync(int id, Category category);
        Task<bool> AddDataAsync(Category category);
    }
}
