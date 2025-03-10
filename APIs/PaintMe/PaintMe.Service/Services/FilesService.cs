using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
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

        public List<FileDto> GetList()
        {
            var data = _filesRepository.GetAllData();
            return _mapper.Map<List<FileDto>>(data);
        }

        public FileDto GetById(int id)
        {
            var data = _filesRepository.GetByIdData(id);
            Console.WriteLine(data == null ? "File not found" : "File found");
            var result = _mapper.Map<FileDto>(data);
            Console.WriteLine(result);
            return result;
        }

        public bool Update(int id, FileDto file)
        {
            var item = GetById(id);
            if (item == null) return false;
            file.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
            var dataToUpdate=_mapper.Map<File>(data);
            return _filesRepository.UpdateData(id, data, dataToUpdate);
        }

        public bool Add(FileDto file)
        {
            if (_filesRepository.GetByIdData(file.Id) != null)
                return false;
            file.CreatedAt = DateTime.Now;
            file.UpdatedAt = DateTime.Now;
            var data = _mapper.Map<File>(file);
            return _filesRepository.AddData(data);
        }

        public bool Delete(int id)
        {

            var item = GetById(id);
            if (item == null) return false;
            var itemToDelete = _mapper.Map<File>(item);
            return _filesRepository.RemoveItemFromData(id);
        }
    }
}