using PaintMe.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaintMe.API.PutModels
{
    public class UserPutModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleEnum Role { get; set; }

    }
}
