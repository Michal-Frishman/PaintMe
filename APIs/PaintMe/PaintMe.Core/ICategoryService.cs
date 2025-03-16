using System.Collections.Generic;
using System.Threading.Tasks;
using PaintMe.Core.DTOs;

namespace PaintMe.Service.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetListAsync();
        Task<CategoryDto> GetByIdAsync(int id);
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateAsync(int id, CategoryDto category);
        Task<bool> AddAsync(CategoryDto category);
    }
}
