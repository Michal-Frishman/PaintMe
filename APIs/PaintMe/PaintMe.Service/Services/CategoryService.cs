//using AutoMapper;
//using PaintMe.Core.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using PaintMe.Core;
//using PaintMe.Core.DTOs;
//using PaintMe.Service.Repositories;

//namespace PaintMe.Service.Services
//{
//    public class CategoryService : ICategoryService
//    {
//        readonly ICategoryRepository _categoryRepository;
//        readonly IMapper _mapper;

//        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
//        {
//            _categoryRepository = categoryRepository;
//            _mapper = mapper;
//        }

//        public async Task<List<CategoryDto>> GetListAsync() // שינוי כאן
//        {
//            var categoryList = await _categoryRepository.GetAllDataAsync();
//            return _mapper.Map<List<CategoryDto>>(categoryList); // שינוי כאן
//        }

//        public async Task<CategoryDto> GetByIdAsync(int id) // שינוי כאן
//        {
//            var categoryEntity = await _categoryRepository.GetByIdDataAsync(id);
//            return _mapper.Map<CategoryDto>(categoryEntity); // שינוי כאן
//        }


//        public async Task<bool> DeleteAsync(int id) // שינוי כאן
//        {
//            if (id < 0) return false;

//            return await _categoryRepository.RemoveItemFromDataAsync(id);
//        }
//        public async Task<bool> UpdateAsync(int id, CategoryDto category) // שינוי כאן
//        {
//            if (id < 0)
//                return false;

//            var categoryEntity = _mapper.Map<Category>(category); // שינוי כאן
//            return await _categoryRepository.UpdateDataAsync(id, categoryEntity);
//        }

//        public async Task<bool> AddAsync(CategoryDto category) // שינוי כאן
//        {
//            var categoryEntity = _mapper.Map<Category>(category); // שינוי כאן
//            if (await _categoryRepository.GetByIdDataAsync(categoryEntity.Id) == null)
//            {
//                var isSuccess = await _categoryRepository.AddDataAsync(categoryEntity);
//                return isSuccess; // שינוי כאן
//            }
//            return false;
//        }
//    }
//}
using AutoMapper;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Service.Repositories;
using PaintMe.Core.IServices;

namespace PaintMe.Service.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly ITokenContextService _tokenContextService;

        public CategoryService(
            ICategoryRepository categoryRepository,
            IMapper mapper,
            ITokenContextService tokenContextService)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _tokenContextService = tokenContextService;
        }

        public async Task<List<CategoryDto>> GetListAsync()
        {
            var categoryList = await _categoryRepository.GetAllDataAsync();
            return _mapper.Map<List<CategoryDto>>(categoryList);
        }

        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            var categoryEntity = await _categoryRepository.GetByIdDataAsync(id);
            return _mapper.Map<CategoryDto>(categoryEntity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (id < 0) return false;
            return await _categoryRepository.RemoveItemFromDataAsync(id);
        }

        public async Task<bool> UpdateAsync(int id, CategoryDto category)
        {
            if (id < 0) return false;

            var categoryEntity = _mapper.Map<Category>(category);

            // עדכון שדות audit
            var userId = _tokenContextService.GetUserId();
            categoryEntity.UpdatedBy = userId;
            categoryEntity.UpdatedAt = DateTime.UtcNow;

            return await _categoryRepository.UpdateDataAsync(id, categoryEntity);
        }
        public async Task<Dictionary<string, int>> GetPopularityAsync()
        {
            return await _categoryRepository.GetCategoryPopularityAsync();
        }

        public async Task<bool> AddAsync(CategoryDto category)
        {
            var categoryEntity = _mapper.Map<Category>(category);

            if (await _categoryRepository.GetByIdDataAsync(categoryEntity.Id) == null)
            {
                // עדכון שדות audit
                var userId = _tokenContextService.GetUserId();
                categoryEntity.CreatedBy = userId;
                categoryEntity.CreatedAt = DateTime.UtcNow;
                categoryEntity.UpdatedBy = userId;
                categoryEntity.UpdatedAt = DateTime.UtcNow;

                var isSuccess = await _categoryRepository.AddDataAsync(categoryEntity);
                return isSuccess;
            }
            return false;
        }
    }
}
