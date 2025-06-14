using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
namespace PaintMe.Service.Services
{
    public class RoleService : IRoleService
    {
        readonly IRoleRepository _roleRepository;
        readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<RoleDto>> GetRolesAsync()
        {
            var roles = await _roleRepository.GetRolesAsync();
            return _mapper.Map<IEnumerable<RoleDto>>(roles);
        }

        public async Task<RoleDto> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.GetRoleByNameAsync(roleName);
            return _mapper.Map<RoleDto>(role);
        }


        public async Task<bool> AddRoleAsync(RoleDto role)
        {
            return await _roleRepository.AddRoleAsync(_mapper.Map<Role>(role));
        }
        public async Task<bool> DeleteRoleAsync(int id)
        {
            return await _roleRepository.DeleteRoleAsync(id);
        }

    }
}
