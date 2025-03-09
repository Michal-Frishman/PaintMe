using PaintMe.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core.DTOs
{
    public class ColoredFileDto
    {
        public int Id { get; set; }
        public int OriginalDrawingId { get; set; }
        public string ColoredImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public int UserId { get; set; }
    }
}
