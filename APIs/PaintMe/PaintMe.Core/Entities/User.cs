using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;


namespace PaintMe.Core.Entities
{
    //[Index(nameof(Email), nameof(Name), IsUnique = true)]

    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public DateTime CreatedAt { get; set; }
        public int? CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public User UserCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

        [ForeignKey(nameof(UpdatedBy))]
        public User UserUpdated { get; set; }
        public string RoleName { get; set; }
    }
}
