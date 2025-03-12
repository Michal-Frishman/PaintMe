using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Service.Services
{
    public class FilesService : IFilesService
    {
        readonly IFilesRepository _filesRepository;
        readonly IMapper _mapper;

        public FilesService(IMapper mapper, IFilesRepository dataContext)
        {
            _mapper = mapper;
            _filesRepository = dataContext;
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
            return await _filesRepository.UpdateDataAsync(id, data);
        }

        public async Task<FileDto> AddAsync(FileDto file)
        {
            if (await _filesRepository.GetByIdDataAsync(file.Id) != null)
                return null;
            file.CreatedAt = DateTime.Now;
            file.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
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
    }
}
