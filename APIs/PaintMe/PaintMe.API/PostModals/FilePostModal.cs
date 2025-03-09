using PaintMe.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaintMe.API.PostModals
{
    public class FilePostModal
    {
        public string Name { get; set; }
        public FileCategoryEnum Category { get; set; }
        public string FileUrl { get; set; }
    }
}
