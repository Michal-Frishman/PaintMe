using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IService<FileDto> _fileService;
        private readonly IMapper _mapper;

        public FilesController(IService<FileDto> fileService, IMapper mapper)
        {
            _fileService = fileService;
            _mapper = mapper;
        }

        // GET: api/Files
        [HttpGet]
        public ActionResult<List<FileDto>> Get()
        {
            var result = _fileService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }
            var resultDto = _mapper.Map<IEnumerable<FileDto>>(result);
            return Ok(resultDto);
        }

        // GET api/Files/5
        [HttpGet("{id}")]
        public ActionResult<FileDto> GetById(int id)
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
            var resultDto = _mapper.Map<FileDto>(result);
            return Ok(resultDto);
        }

        // POST api/Files
        [HttpPost]
        public ActionResult<FileDto> Post([FromBody] FilePostModal filePostModal)
        {
            if (filePostModal == null)
            {
                return BadRequest("Invalid data.");
            }

            var fileDto = _mapper.Map<FileDto>(filePostModal);
            var result = _fileService.Add(fileDto);
            if (!result)
            {
                return BadRequest("Failed to create the file.");
            }

            return CreatedAtAction(nameof(GetById), new { id = fileDto.Id }, fileDto);
        }

        // PUT api/Files/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] FilePostModal filePostModal)
        {
            if (id <= 0 || filePostModal == null)
            {
                return BadRequest("Invalid data or ID.");
            }
            var fileDto = _mapper.Map<FileDto>(filePostModal);
            var updated = _fileService.Update(id, fileDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("File not found.");
        }

        // DELETE api/Files/5
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
