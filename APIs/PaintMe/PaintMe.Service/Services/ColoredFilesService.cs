
using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaintMe.Service.Services
{
    public class ColoredFilesService : IService<ColoredFileDto>
    {
        readonly IRepository<ColoredFile> _coloredFilesRepository;
        readonly IMapper _mapper;

        public ColoredFilesService(IMapper mapper, IRepository<ColoredFile> dataContext)
        {
            _mapper = mapper;
            _coloredFilesRepository = dataContext;
        }

        public async Task<List<ColoredFileDto>> GetListAsync()
        {
            var data = await _coloredFilesRepository.GetAllDataAsync();
            return _mapper.Map<List<ColoredFileDto>>(data);
        }

        public async Task<ColoredFileDto> GetByIdAsync(int id)
        {
            var data = await _coloredFilesRepository.GetByIdDataAsync(id);
            Console.WriteLine(data == null ? "ColoredFile not found" : "ColoredFile found");
            return _mapper.Map<ColoredFileDto>(data);
        }

        public async Task<bool> UpdateAsync(int id, ColoredFileDto coloredFile)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            coloredFile.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<ColoredFile>(coloredFile);
            return await _coloredFilesRepository.UpdateDataAsync(id, data);
        }

        public async Task<bool> AddAsync(ColoredFileDto coloredFile)
        {
            if (await _coloredFilesRepository.GetByIdDataAsync(coloredFile.Id) != null)
                return false;
            coloredFile.CreatedAt = DateTime.Now;
            coloredFile.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<ColoredFile>(coloredFile);
            return await _coloredFilesRepository.AddDataAsync(data);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item == null) return false;
            return await _coloredFilesRepository.RemoveItemFromDataAsync(id);
        }
    }
}
