using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core.Entities
{
    [Table("Categories")]

    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int UpdatedBy { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
