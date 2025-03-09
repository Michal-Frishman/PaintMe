namespace PaintMe.Core
{
    public interface IService<T>
    {
        List<T> GetList();
        T GetById(int id);
        bool Update(int id, T value);
        bool Delete(int id);
        bool Add(T value);
    }
}
