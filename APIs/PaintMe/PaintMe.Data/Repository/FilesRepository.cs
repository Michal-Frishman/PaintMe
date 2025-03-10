using PaintMe.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using PaintMe.Core;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Data.Repository
{
    public class FilesRepository : IRepository<File>
    {
        private readonly DataContext _dataContext;

        public FilesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // Retrieve all files from the database
        public List<File> GetAllData()
        {
            return _dataContext.Files.ToList();
        }

        // Add a new file to the database
        public bool AddData(File file)
        {
            try
            {
                file.CreatedAt = DateTime.Now; // Set creation date
                _dataContext.Files.Add(file); // Add file to the context
                _dataContext.SaveChanges(); // Save changes to the database
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message); // Log error message
                return false; // Return false if an error occurs
            }
        }

        // Retrieve a file by its ID
        public File GetByIdData(int id)
        {
            return _dataContext.Files.FirstOrDefault(f => f.Id == id);
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
                _dataContext.Files.Remove(item);
                _dataContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Update an existing file's details
        public bool UpdateData(int id, File file,File fileToUpdatez)
        {
            try
            {
                var fileToUpdate = GetByIdData(id);
                if (fileToUpdate == null)
                {
                    return false;
                }
                fileToUpdate.Name = file.Name;
                fileToUpdate.Category = file.Category;
                fileToUpdate.FileUrl = file.FileUrl;
                fileToUpdate.UpdatedAt = DateTime.Now; 
                fileToUpdate.UpdatedBy = file.UpdatedBy;

                _dataContext.SaveChanges(); 
                return true;
            }
            catch (Exception)
            {
                return false; 
            }
        }

        // Uncomment if needed to check existence of a file by ID
        // public bool isExist(int id)
        // {
        //     return _dataContext.Files.Any(f => f.Id == id);
        // }
    }
}
