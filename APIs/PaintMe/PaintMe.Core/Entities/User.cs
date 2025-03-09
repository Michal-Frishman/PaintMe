using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PaintMe.Core.Entities
{
  
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }  
        public string FirstName { get; set; }  
        public string LastName { get; set; }  
        public string Email { get; set; }
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public RoleEnum Role { get; set; }
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
