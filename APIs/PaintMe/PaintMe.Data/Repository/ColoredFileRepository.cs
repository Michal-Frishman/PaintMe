using PaintMe.Core.Entities;
using PaintMe.Core;
using Microsoft.EntityFrameworkCore;

namespace PaintMe.Data.Repository
{
    public class ColoredFilesRepository : IColoredFileRepository
    {
        private readonly DataContext _dataContext;

        public ColoredFilesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<ColoredFile>> GetAllDataAsync()
        {
            return await _dataContext.ColoredFiles
                .Include(cf => cf.User)
                .ToListAsync();
        }

        public async Task<ColoredFile> AddDataAsync(ColoredFile coloredFile)
        {
            try
            {
                coloredFile.CreatedAt = DateTime.Now;
                await _dataContext.ColoredFiles.AddAsync(coloredFile);
                await _dataContext.SaveChangesAsync();
                return coloredFile;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public async Task<ColoredFile> GetByIdDataAsync(int id)
        {
            return await _dataContext.ColoredFiles.FirstOrDefaultAsync(cf => cf.Id == id);
        }
        public async Task<List<ColoredFile>> GetByUserIdDataAsync(int id)
        {
            return await _dataContext.ColoredFiles.Include(cf => cf.User).Where(cf => cf.UserId == id).ToListAsync();
        }

        public async Task<bool> RemoveItemFromDataAsync(int id)
        {
            try
            {
                var item = await GetByIdDataAsync(id);
                if (item == null)
                {
                    return false;
                }
                _dataContext.ColoredFiles.Remove(item);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateDataAsync(int id, ColoredFile coloredFile)
        {
            try
            {
                var fileToUpdate = await GetByIdDataAsync(id);
                if (fileToUpdate == null)
                {
                    return false;
                }
                fileToUpdate.OriginalDrawingId = coloredFile.OriginalDrawingId;
                fileToUpdate.ColoredImageUrl = coloredFile.ColoredImageUrl;
                fileToUpdate.UpdatedAt = DateTime.Now;
                fileToUpdate.UserId = coloredFile.UserId;

                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<Dictionary<int, int>> GetPopularActivityHoursAsync()
        {
            return await _dataContext.ColoredFiles
                .GroupBy(cf => cf.CreatedAt.Hour)
                .OrderBy(g => g.Key)
                .Select(g => new
                {
                    Hour = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(g => g.Hour, g => g.Count);
        }

        public async Task<Dictionary<string, int>> GetColoredDrawingsPerDayAsync()
        {
            return await _dataContext.ColoredFiles
                .GroupBy(cf => cf.CreatedAt.Date)
                .OrderBy(g => g.Key)
                .Select(g => new
                {
                    Date = g.Key.ToString("yyyy-MM-dd"),
                    Count = g.Count()
                })
                .ToDictionaryAsync(g => g.Date, g => g.Count);
        }

    }
}
