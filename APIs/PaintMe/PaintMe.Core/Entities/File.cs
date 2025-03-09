﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PaintMe.Core.Entities
{

    [Table("Files")]

    public class File
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public FileCategoryEnum Category { get; set; }
        public string FileUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public User UserCreated { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public int? UpdatedBy { get; set; }

        [ForeignKey(nameof(UpdatedBy))]
        public User UserUpdated { get; set; }
    }
}
