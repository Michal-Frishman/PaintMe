//using PaintMe.Core;
//using PaintMe.Core.DTOs;
//using PaintMe.Core.Entities;
//using System.Threading.Tasks;

//namespace PaintMe.Service.Services
//{
//    public class UserRoleService : IUserRoleService
//    {
//        private readonly IUserRolesRepository _userRolesRepository;
//        private readonly IRoleRepository _roleRepository;

//        public UserRoleService(IUserRolesRepository userRolesRepository, IRoleRepository roleRepository)
//        {
//            _userRolesRepository = userRolesRepository;
//            _roleRepository = roleRepository;
//        }

//        public async Task<UserRole> AddAsync(string roleName, int userId)
//        {
//            var role = await _roleRepository.GetByNameAsync(roleName);
//            if (role == null)
//            {
//                throw new Exception($"Role '{roleName}' not found.");
//            }

//            var userRole = new UserRole
//            {
//                UserId = userId,
//                RoleId = role.Id
//            };

//            var result = await _userRolesRepository.AddDataAsync(userRole);
//            return result;
//        }

//   }
//}
