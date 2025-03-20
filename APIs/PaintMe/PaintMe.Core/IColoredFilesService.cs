using PaintMe.Core.DTOs;


namespace PaintMe.Core
{
    public interface IColoredFilesService
    {
       public Task<List<ColoredFileDto>> GetListAsync();
       public Task<ColoredFileDto> GetByIdAsync(int id);
       public Task<List<ColoredFileDto>> GetByUserIdAsync(int id);
                
       public Task<bool> UpdateAsync(int id, ColoredFileDto value);
       public Task<bool> DeleteAsync(int id);
        public Task<ColoredFileDto> AddAsync(ColoredFileDto value);
    }
}
