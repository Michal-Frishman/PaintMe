using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaintMe.Service.Services;
using PaintMe.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using PaintMe.Core.IServices;
using PaintMe.Core;

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
        public AuthController(IConfiguration configuration, AuthService authService, IUserService userService, IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
        }

       
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {

            var role = await _userService.AuthenticateAsync(model.Email, model.Password);
            var user = await _userService.FindUserByEmailAsync(model.Email);
            if (user == null) return Unauthorized("Invalid credentials");
            if (role == "Admin" || role == "User")
            {
                var token = _authService.GenerateJwtToken(user.Id, model.Email, role);
                return Ok(new { Token = token, User = user });
            }
            return Unauthorized("Invalid role");
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterPostModel model)
        {
            var existingUser = await _userService.FindUserByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            var user = _mapper.Map<UserDto>(model);
            var newUser = await _userService.AddAsync(user);
            var token = _authService.GenerateJwtToken(newUser.Id, model.Email, "User");

            return Ok(new { Token = token, User = newUser });
        }

        public class LoginModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class RegisterPostModel
        {
            public string Email { get; set; }
            public string Password { get; set; }

        }
    }
}

