namespace PaintMe.Core
{
    public interface IService<T>
    {
        Task<List<T>> GetListAsync();
        Task<T> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, T value);
        Task<bool> DeleteAsync(int id);
        Task<T> AddAsync(T value);
    }
}
