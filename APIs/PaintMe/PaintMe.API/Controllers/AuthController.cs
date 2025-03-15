using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaintMe.Core;
using PaintMe.Service.Services;
using PaintMe.Core.DTOs;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AuthService _authService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        //IUserRoleService _userRoleService;
        public AuthController(IConfiguration configuration, AuthService authService, IUserService userService, IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
            //_userRoleService = userRoleService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            var roleName = await _userService.AuthenticateAsync(model.Name, model.Password);
            if (roleName == "admin")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
                return Ok(new { Token = token });
            }
            else if (roleName == "editor")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Editor" });
                return Ok(new { Token = token });
            }
            else if (roleName == "viewer")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Viewer" });
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return Conflict("User is not valid");
            }
            var modelD = _mapper.Map<UserDto>(model);
            var existingUser = await _userService.AddAsync(modelD);
            if (existingUser == null)
                return BadRequest();
            //var userRole = await _userRoleService.AddAsync(model.RoleName, existingUser.Id);
            //if (userRole == null)
            //    return BadRequest();
            var token = _authService.GenerateJwtToken(model.Name, new[] { model.RoleName });
            return Ok(new { Token = token });


        }
    }
    public class LoginModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
    public class RegisterModel
    {

        public string Name { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }

        public string Email { get; set; }
        public string RoleName { get; set; }
    }
}

