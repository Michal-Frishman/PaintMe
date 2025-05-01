
using System.ComponentModel.DataAnnotations;

namespace PaintMe.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string RoleName { get; set; }

        public string Description { get; set; }

        
        
    }
}
