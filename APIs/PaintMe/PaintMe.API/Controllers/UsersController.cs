using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;
using Microsoft.AspNetCore.Authorization;
using PaintMe.Core.IServices;
using PaintMe.Core;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService usersService, IMapper mapper)
        {
            _userService = usersService;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            var result = await _userService.GetListAsync() ?? new List<UserDto>();
            return result;
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = await _userService.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound("User not found.");
            }
            return result;
        }

        // POST api/Users
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserPostModal userPostModal)
        {
            if (userPostModal == null)
            {
                return BadRequest("Invalid user data.");
            }

            var userDto = _mapper.Map<UserDto>(userPostModal);
            //userDto.PasswordHash = "";
            var result = await _userService.AddAsync(userDto);
            if (result == null)
            {
                return BadRequest("Failed to create user.");
            }
            return Ok(result);
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<bool>> Put(int id, [FromBody] UserPostModal userPutModal)
        {
            if (id <= 0 || userPutModal == null)
            {
                return BadRequest("Invalid ID or user data.");
            }
            var userDto = _mapper.Map<UserDto>(userPutModal);
            var updated = await _userService.UpdateAsync(id, userDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("User not found.");
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<bool>> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }
            var deleted = await _userService.DeleteAsync(id);
            if (deleted)
            {
                return Ok(true);
            }
            return NotFound("User not found.");
        }
        [HttpGet("stats/new-users-per-month")]
        public async Task<ActionResult<Dictionary<string, int>>> GetNewUsersPerMonth()
        {
            var result = await _userService.GetNewUsersPerMonthAsync();
            return Ok(result);
        }

    }
}
