namespace PaintMe.Core
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAllDataAsync();
        Task<T> GetByIdDataAsync(int id);
        Task<bool> AddDataAsync(T t);
        Task<bool> UpdateDataAsync(int id, T item);
        Task<bool> RemoveItemFromDataAsync(int id);
    }
}
