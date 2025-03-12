using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Service.Services
{
    public class FilesService : IService<FileDto>
    {
        readonly IRepository<File> _filesRepository;
        readonly IMapper _mapper;

        public FilesService(IMapper mapper, IRepository<File> dataContext)
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

        public async Task<bool> AddAsync(FileDto file)
        {
            if (await _filesRepository.GetByIdDataAsync(file.Id) != null)
                return false;
            file.CreatedAt = DateTime.Now;
            file.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
            return await _filesRepository.AddDataAsync(data);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            return await _filesRepository.RemoveItemFromDataAsync(id);
        }
    }
}
