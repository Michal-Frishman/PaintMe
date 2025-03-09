using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore;

namespace PaintMe.Data.Repository
{
    public class ColoredFilesRepository : IRepository<ColoredFile>
    {
        private readonly DataContext _dataContext;

        public ColoredFilesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<ColoredFile> GetAllData()
        {
            return _dataContext.ColoredFiles
                .Include(cf => cf.User) 
                .ToList();
        }

        public bool AddData(ColoredFile coloredFile)
        {
            try
            {
                coloredFile.CreatedAt = DateTime.Now;
                _dataContext.ColoredFiles.Add(coloredFile);
                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public ColoredFile GetByIdData(int id)
        {
            return _dataContext.ColoredFiles.AsTracking()
                .FirstOrDefault(cf => cf.Id == id);
        }

        public bool RemoveItemFromData(int id)
        {
            try
            {
                var item = GetByIdData(id);
                if (item == null)
                {
                    return false;
                }
                _dataContext.ColoredFiles.Remove(item);
                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateData(int id, ColoredFile coloredFile)
        {
            try
            {
                Console.WriteLine("------------------------updating");
                var fileToUpdate = GetByIdData(id);

                if (fileToUpdate == null)
                {
                    return false;
                }
                else
                {
                    Console.WriteLine("------------------------fileToUpdate");

                }

                fileToUpdate.OriginalDrawingId = coloredFile.OriginalDrawingId;
                fileToUpdate.ColoredImageUrl = coloredFile.ColoredImageUrl;
                fileToUpdate.UpdatedAt = DateTime.Now;
                fileToUpdate.UserId = coloredFile.UserId;

                _dataContext.SaveChanges();
                Console.WriteLine("after save ");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool isExist(int id)
        {
            return _dataContext.ColoredFiles.Any(cf => cf.Id == id);
        }
    }
}