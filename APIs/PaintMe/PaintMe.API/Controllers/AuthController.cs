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
        //private readonly IUserRoleService _userRoleService;
        public AuthController(IConfiguration configuration, AuthService authService, IUserService userService, IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
            //_userRoleService = userRoleService;
            //IUserRoleService userRoleService
        }

        //[HttpPost("login")]
        //public async Task<UserDto> LoginAsync([FromBody] LoginModel model)
        
            //var roleName = await _userService.AuthenticateAsync(model.Name, model.Password);
            //if (roleName == "admin")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
            //    return Ok(new { Token = token });
            //}
            //else if (roleName == "editor")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Editor" });
            //    return Ok(new { Token = token });
            //}
            //else if (roleName == "viewer")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Viewer" });
            //    return Ok(new { Token = token });
            //}
        //    await Console.Out.WriteLineAsync(model.Email+"--------");
        //    //return Unauthorized();
        //    //var a=  await _userService.AuthenticateAsync(model.Email, model.Password);
        //    return await _userService.FindUserByEmailAsync(model.Email)??new UserDto();
        //}
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {

            var role = await _userService.AuthenticateAsync(model.Email, model.Password);
            var user =await _userService.FindUserByEmailAsync(model.Email);
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
            var token = _authService.GenerateJwtToken(newUser.Id, model.Email,  "User" );

            return Ok(new { Token = token, User = newUser });
        }
        //add admin only for admin
        //[HttpPost("register-admin")]
        //[Authorize(Policy = "AdminOly")]
        //public async Task<IActionResult> RegisterAdminAsync([FromBody] RegisterPostModel model)
        //{
        //    var existingUser = await _userService.FindUserByEmailAsync(model.Email);
        //    if (existingUser != null)
        //    {
        //        return BadRequest("User already exists");
        //    }
        //    var user = _mapper.Map<UserDto>(model);
        //    var newUser = await _userService.AddAsync(user);
        //    var token = _authService.GenerateJwtToken(newUser.Id, model.Email, "Admin");
        //    return Ok(new { Token = token, User = newUser });
        //}
        //[HttpPost("register")]
        //public async Task<IActionResult> RegisterAsync([FromBody] RegisterPostModel model)
        //{
        //    if (model == null)
        //    {
        //        return Conflict("משתמש לא תקין");
        //    }

        //    var modelD = _mapper.Map<UserDto>(model);
        //    return Ok("hhh");
        // העברת הסיסמה ישירות למתודה
        //var existingUser = await _userService.Add(modelD, model.Password);

        //if (existingUser == null)
        //    return BadRequest("המשתמש כבר קיים במערכת");

        ////var userRole = await _UserRoleService.AddAsync(model.RoleName, existingUser.Id);
        //if (userRole == null)
        //    return BadRequest("תפקיד לא תקין");

        //var token = _authService.GenerateJwtToken(existingUser.Id, model.Email, new[] { model.RoleName });
        //return Ok(new { Token = token, User = existingUser });
        //var res2 = _mapper.Map<UserDto>(userRegister);

        //var res = await _userService.RegisterAsync(_mapper.Map<UserDto>(userRegister), res2.Roles);
        //if (res == null)
        //{
        //    return BadRequest();
        //}

        //var tokenString = _authService.GenerateJwtToken(res.Email, res.Roles);
        //return Ok(new { Token = tokenString, user = res });
        //}
    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        //public string[] Roles { get; set; }
    }
    //public class LoginModel
    //{
    //    public string Email { get; set; }
    //    public string Password { get; set; }
    //}
    //public class RegisterModel
    //{

    //    //public string Name { get; set; }
    //    public string Password { get; set; }
    //    //public string PasswordHash { get; set; }

    //    public string Email { get; set; }
    //    //public string RoleName { get; set; }
    //}
    public class RegisterPostModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
      
    }
    //var res = await _userService.LoginAsync(loginModel.Email, loginModel.Password);
    //if (res == null)
    //{
    //    return NotFound();
    //}
    ////if (res.IsActive == false)
    ////    return Unauthorized();
    //var res2 = _mapper.Map<UserDto>(loginModel);
    //var tokenString = _authService.GenerateJwtToken(res.Email, res2.Roles);
    //return Ok(new { Token = tokenString, user = res });

    //var user = await _userService.FindUserByEmailAsync(model.Email);
    //if (user == null)
    //{
    //    return Unauthorized();
    //}

    //var token = _authService.GenerateJwtToken(user.Email, new[] { user.Password }, user.Id); // העברת ה-ID
    //return Ok(new { Token = token });
}

