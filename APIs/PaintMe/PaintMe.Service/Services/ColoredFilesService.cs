using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

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
        public List<ColoredFileDto> GetList()
        {
            var data = _coloredFilesRepository.GetAllData();
            return _mapper.Map<List<ColoredFileDto>>(data); 
        }


        public ColoredFileDto GetById(int id)
        {
            var data = _coloredFilesRepository.GetByIdData(id);
            Console.WriteLine(data == null ? "ColoredFile not found" : "ColoredFile found");
            var result = _mapper.Map<ColoredFileDto>(data);
            Console.WriteLine(result);
            return result;
        }

        public bool Update(int id, ColoredFileDto coloredFile)
        {
            var item = GetById(id);
            if (item == null) return false;
            coloredFile.UpdatedAt = DateTime.Now;
            var data=_mapper.Map<ColoredFile>(coloredFile);
            return _coloredFilesRepository.UpdateData(id, data);
        }

        public bool Add(ColoredFileDto coloredFile)
        {
            if (_coloredFilesRepository.GetByIdData(coloredFile.Id) != null)
                return false;
            coloredFile.CreatedAt = DateTime.Now;
            coloredFile.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<ColoredFile>(coloredFile);
            return _coloredFilesRepository.AddData(data);
        }

        public bool Delete(int id)
        {
            return _coloredFilesRepository.RemoveItemFromData(id);
        }
    }
}
