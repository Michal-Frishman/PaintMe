using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IService<UserDto> _usersService;
        private readonly IMapper _mapper;

        public UsersController(IService<UserDto> usersService, IMapper mapper)
        {
            _usersService = usersService;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<List<UserDto>> Get()
        {
            var result = _usersService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound("No users found.");
            }
            var resultDto = _mapper.Map<IEnumerable<UserDto>>(result);
            return Ok(resultDto);
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        public ActionResult<UserDto> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = _usersService.GetById(id);
            if (result == null)
            {
                return NotFound("User not found.");
            }
            var resultDto = _mapper.Map<UserDto>(result);
            return Ok(resultDto);
        }

        // POST api/Users
        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserPostModal userPostModal)
        {
            if (userPostModal == null)
            {
                return BadRequest("Invalid user data.");
            }

            var userDto = _mapper.Map<UserDto>(userPostModal);
            var result = _usersService.Add(userDto);
            if (!result)
            {
                return BadRequest("Failed to create user.");
            }

            return CreatedAtAction(nameof(GetById), new { id = userDto.Id }, userDto);
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] UserPostModal userPostModal)
        {
            if (id <= 0 || userPostModal == null)
            {
                return BadRequest("Invalid ID or user data.");
            }
            var userDto = _mapper.Map<UserDto>(userPostModal);
            var updated = _usersService.Update(id, userDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("User not found.");
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }
            var deleted = _usersService.Delete(id);
            if (deleted)
            {
                return Ok(true);
            }
            return NotFound("User not found.");
        }
    }
}
