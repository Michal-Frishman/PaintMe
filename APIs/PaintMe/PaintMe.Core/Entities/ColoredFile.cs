﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PaintMe.Core.Entities
{

    [Table("ColoredFiles")]

    public class ColoredFile
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int OriginalDrawingId { get; set; }

        [ForeignKey(nameof(OriginalDrawingId))]
        public File File { get; set; }
        public string ColoredImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public int UpdatedBy { get; set; }
        public int CreatedBy { get; set; }
    }
}
