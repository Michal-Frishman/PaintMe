using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.IServices;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Service.Services
{
    public class FilesService : IFilesService
    {
        readonly IFilesRepository _filesRepository;
        readonly IMapper _mapper;
        readonly ITokenContextService _tokenContextService;

        public FilesService(IMapper mapper, IFilesRepository dataContext, ITokenContextService tokenContextService)
        {
            _mapper = mapper;
            _filesRepository = dataContext;
            _tokenContextService = tokenContextService;
        }

        public async Task<List<FileDto>> GetListAsync()
        {
            var data = await _filesRepository.GetAllDataAsync();
            return _mapper.Map<List<FileDto>>(data);
        }

        public async Task<FileDto> GetByIdAsync(int id)
        {
            var data = await _filesRepository.GetByIdDataAsync(id);
            Console.WriteLine(data == null ? "File not found" : "File found");
            return _mapper.Map<FileDto>(data);
        }

        public async Task<bool> UpdateAsync(int id, FileDto file)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            file.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
            data.UpdatedBy = _tokenContextService.GetUserId();
            return await _filesRepository.UpdateDataAsync(id, data);
        }

        public async Task<FileDto> AddAsync(FileDto file)
        {
            if (await _filesRepository.GetByIdDataAsync(file.Id) != null)
                return null;
            file.CreatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
            data.CreatedBy = _tokenContextService.GetUserId();
            var a = await _filesRepository.AddDataAsync(data);
            var x = _mapper.Map<FileDto>(a);
            return x;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            return await _filesRepository.RemoveItemFromDataAsync(id);
        }
        public async Task<List<FileDto>> GetByCategoryDataAsync(int categoryId)
        {
            var data = await _filesRepository.GetByCategoryDataAsync(categoryId);
            return _mapper.Map<List<FileDto>>(data);
        }
        public async Task<List<FileDto>> GetDataByUserId()
        {
            int userId = _tokenContextService.GetUserId();
            var files = await _filesRepository.GetDataByUserId(userId);
            return _mapper.Map<List<FileDto>>(files);
        }

    }
}
