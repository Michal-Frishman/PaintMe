using AutoMapper;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Service.Repositories;

namespace PaintMe.Service.Services
{
    public class CategoryService : ICategoryService
    {
        readonly ICategoryRepository _categoryRepository;
        readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetListAsync() // שינוי כאן
        {
            var categoryList = await _categoryRepository.GetAllDataAsync();
            return _mapper.Map<List<CategoryDto>>(categoryList); // שינוי כאן
        }

        public async Task<CategoryDto> GetByIdAsync(int id) // שינוי כאן
        {
            var categoryEntity = await _categoryRepository.GetByIdDataAsync(id);
            return _mapper.Map<CategoryDto>(categoryEntity); // שינוי כאן
        }


        public async Task<bool> DeleteAsync(int id) // שינוי כאן
        {
            if (id < 0) return false;

            return await _categoryRepository.RemoveItemFromDataAsync(id);
        }
        public async Task<bool> UpdateAsync(int id, CategoryDto category) // שינוי כאן
        {
            if (id < 0)
                return false;

            var categoryEntity = _mapper.Map<Category>(category); // שינוי כאן
            return await _categoryRepository.UpdateDataAsync(id, categoryEntity);
        }

        public async Task<bool> AddAsync(CategoryDto category) // שינוי כאן
        {
            var categoryEntity = _mapper.Map<Category>(category); // שינוי כאן
            if (await _categoryRepository.GetByIdDataAsync(categoryEntity.Id) == null)
            {
                var isSuccess = await _categoryRepository.AddDataAsync(categoryEntity);
                return isSuccess; // שינוי כאן
            }
            return false;
        }
    }
}
