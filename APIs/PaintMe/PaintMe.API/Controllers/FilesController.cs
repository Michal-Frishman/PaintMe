using Microsoft.AspNetCore.Mvc;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IService<File> _fileService;

        public FilesController(IService<File> fileService)
        {
            _fileService = fileService;
        }

        // GET: api/<FilesController>
        [HttpGet]
        public ActionResult<List<File>> Get()
        {
            var result = _fileService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // GET api/<FilesController>/5
        [HttpGet("{id}")]
        public ActionResult<File> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = _fileService.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST api/<FilesController>
        [HttpPost]
        public ActionResult<bool> Post([FromBody] File file)
        {
            if (file == null)
            {
                return BadRequest("Invalid data.");
            }

            var result = _fileService.Add(file);
            if (!result)
            {
                return BadRequest("Failed to create the file.");
            }

            return CreatedAtAction(nameof(GetById), new { id = file.Id }, true);
        }

        // PUT api/<FilesController>/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] File file)
        {
            if (id <= 0 || file == null)
            {
                return BadRequest("Invalid data or ID.");
            }

            var updated = _fileService.Update(id, file);
            if (updated)
            {
                return Ok(true);
            }

            return NotFound("File not found.");
        }

        // DELETE api/<FilesController>/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var deleted = _fileService.Delete(id);
            if (deleted)
            {
                return Ok(true);
            }

            return NotFound("File not found.");
        }
    }
}