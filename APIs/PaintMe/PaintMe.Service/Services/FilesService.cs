using PaintMe.Core;
using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Service.Services
{
    public class FilesService:IService<File>
    {
        readonly IRepository<File> _filesRepository;
        public FilesService(IRepository<File> dataContext)
        {
            _filesRepository = dataContext;
        }

        public List<File> GetList()
        {
            var data = _filesRepository.GetAllData();
            return data ?? new List<File>();
        }

        public File GetById(int id)
        {
            return _filesRepository.GetByIdData(id);
        }

        public bool Update(int id, File file)
        {
            var item = GetById(id);
            if (item == null) return false;
            file.UpdatedAt = DateTime.Now;
            return _filesRepository.UpdateData(id, file) == null;
        }

        public bool Add(File file)
        {
            if (_filesRepository.GetByIdData(file.Id) != null)
                return false;

            file.CreatedAt = DateTime.Now;
            file.UpdatedAt = DateTime.Now;
            return _filesRepository.AddData(file);
        }

        public bool Delete(int id)
        {
            if (_filesRepository.isExist(id))
            {
                return _filesRepository.RemoveItemFromData(id);
            }
            return false;
        }
    }
}
