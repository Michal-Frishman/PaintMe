using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core
{
    public interface IColoredFileRepository
    {
        public Task<List<ColoredFile>> GetAllDataAsync();
        public Task<ColoredFile> GetByIdDataAsync(int id);

        public Task<List<ColoredFile>> GetByUserIdDataAsync(int id);

        public Task<ColoredFile> AddDataAsync(ColoredFile t);
        public Task<bool> UpdateDataAsync(int id, ColoredFile item);
        public Task<bool> RemoveItemFromDataAsync(int id);
        Task<Dictionary<int, int>> GetPopularActivityHoursAsync();
        Task<Dictionary<string, int>> GetColoredDrawingsPerDayAsync();
    }
}
