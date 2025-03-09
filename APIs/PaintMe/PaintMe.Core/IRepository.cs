namespace PaintMe.Core
{
    public interface IRepository<T>
    {
        List<T> GetAllData();
        T GetByIdData(int id);
        bool AddData(T t);
        bool UpdateData(int id, T value);
        bool RemoveItemFromData(int id);
        bool isExist(int id);
    }
}
