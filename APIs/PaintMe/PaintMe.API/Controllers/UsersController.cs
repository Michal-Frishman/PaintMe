using Microsoft.AspNetCore.Mvc;
using PaintMe.Core;
using PaintMe.Core.Entities;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IService<User> _usersService;

        public UsersController(IService<User> usersService)
        {
            _usersService = usersService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            var result = _usersService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound("No users found.");
            }
            return Ok(result);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
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
            return Ok(result);
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult<bool> Post([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Invalid user data.");
            }

            var result = _usersService.Add(user);
            if (!result)
            {
                return BadRequest("Failed to create user.");
            }

            return CreatedAtAction(nameof(Get), new { id = user.Id }, true);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] User user)
        {
            if (id <= 0 || user == null)
            {
                return BadRequest("Invalid ID or user data.");
            }

            var updated = _usersService.Update(id, user);
            if (updated)
            {
                return Ok(true);
            }

            return NotFound("User not found.");
        }

        // DELETE api/<UsersController>/5
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