using Microsoft.AspNetCore.Mvc;
using PaintMe.Core.Entities;
using PaintMe.Core;
using AutoMapper;
using PaintMe.Core.DTOs;
using PaintMe.API.PostModals;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColoredFilesController : ControllerBase
    {
        private readonly IService<ColoredFileDto> _coloredFileService;
        private readonly IMapper _mapper;

        public ColoredFilesController(IService<ColoredFileDto> coloredFileService, IMapper mapper)
        {
            _coloredFileService = coloredFileService;
            _mapper = mapper;
        }

        // GET: api/<ColoredFilesController>
        [HttpGet]
        public ActionResult<List<ColoredFileDto>> Get()
        {
            var result = _coloredFileService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }
            var resultDto = _mapper.Map<IEnumerable<ColoredFileDto>>(result);
            return Ok(resultDto);
        }

        // GET api/<ColoredFilesController>/5
        [HttpGet("{id}")]
        public ActionResult<ColoredFileDto> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = _coloredFileService.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            var resultDto = _mapper.Map<ColoredFileDto>(result);
            return Ok(resultDto);
        }

        // POST api/<ColoredFilesController>
        [HttpPost]
        public ActionResult<ColoredFileDto> Post([FromBody] ColoredFilePostModal coloredFile)
        {
            if (coloredFile == null)
            {

                return BadRequest("Invalid data.");
            }
            var coloredFileDto = _mapper.Map<ColoredFileDto>(coloredFile);
            var result = _coloredFileService.Add(coloredFileDto);
            if (!result)
            {
                return BadRequest("Failed to create the colored file.");
            }

            return CreatedAtAction(nameof(GetById), new { id = coloredFileDto.Id }, coloredFileDto);
        }

        // PUT api/<ColoredFilesController>/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] ColoredFilePostModal coloredFile)
        {
            Console.WriteLine($"Received PUT request for ID: {id}");

            if (id <= 0 || coloredFile == null)
            {
                return BadRequest("Invalid data or ID.");
            }
            var coloredFileDto = _mapper.Map<ColoredFileDto>(coloredFile);
            var updated = _coloredFileService.Update(id, coloredFileDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("Colored file not found.");
        }

        // DELETE api/<ColoredFilesController>/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }
            var deleted = _coloredFileService.Delete(id);
            if (deleted)
            {
                return Ok(true);
            }
            return NotFound("Colored file not found.");
        }
    }
}