using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;
using PaintMe.API.PutModels;

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
            return result;
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
            return result;
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
            return Ok(result);
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] UserPostModal userPutModal)
        {
            if (id <= 0 || userPutModal == null)
            {
                return BadRequest("Invalid ID or user data.");
            }
            var userDto = _mapper.Map<UserDto>(userPutModal);
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
