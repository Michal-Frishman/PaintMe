
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using Microsoft.AspNetCore.Mvc;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.IServices;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class RoleController : ControllerBase
    {
        readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }


        [HttpGet]
        public async Task<ActionResult> GetRolesAsync()
        {
            return Ok(await _roleService.GetRolesAsync());
        }


        [HttpGet("{roleName}")]
        public async Task<ActionResult> GetRoleByNameAsync(string roleName)
        {
            return Ok(await _roleService.GetRoleByNameAsync(roleName));
        }


        [HttpPost]
        public async Task<ActionResult> AddRoleAsync([FromBody] RoleDto role)
        {
            return Ok(await _roleService.AddRoleAsync(role));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoleAsync(int id)
        {
            return Ok(await _roleService.DeleteRoleAsync(id));
        }
    }
}
