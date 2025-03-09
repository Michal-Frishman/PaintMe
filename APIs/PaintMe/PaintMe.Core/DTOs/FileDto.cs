using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PaintMe.Core.Entities;

namespace PaintMe.Core.DTOs
{
    public class FileDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public FileCategoryEnum Category { get; set; }
        public string FileUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public int? UpdatedBy { get; set; }

    }
}
