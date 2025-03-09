using PaintMe.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaintMe.API.PostModals
{
    public class UserPostModal
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleEnum Role { get; set; }
    }
}
