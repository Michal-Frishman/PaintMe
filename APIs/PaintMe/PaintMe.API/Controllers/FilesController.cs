using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFilesService _fileService;
        private readonly IMapper _mapper;

        public FilesController(IFilesService fileService, IMapper mapper)
        {
            _fileService = fileService;
            _mapper = mapper;
        }

        // GET: api/Files
        [HttpGet]
        public async Task<ActionResult<List<FileDto>>> Get()
        {
            var result = await _fileService.GetListAsync();
            return Ok(result);
        }

        // GET api/Files/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FileDto>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = await _fileService.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound("File not found.");
            }
            return Ok(result);
        }

        // POST api/Files
        [HttpPost]
        public async Task<ActionResult<FileDto>> Post([FromBody] FilePostModal filePostModal)
        {
            if (filePostModal == null)
            {
                return BadRequest("Invalid file data.");
            }

            var fileDto = _mapper.Map<FileDto>(filePostModal);
            var result = await _fileService.AddAsync(fileDto);
            if (result==null)
            {
                return BadRequest("Failed to create file.");
            }
            return CreatedAtAction(nameof(GetById), new { id = fileDto.Id }, fileDto);
        }

        // PUT api/Files/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] FilePostModal filePutModal)
        {
            if (id <= 0 || filePutModal == null)
            {
                return BadRequest("Invalid ID or file data.");
            }
            var fileDto = _mapper.Map<FileDto>(filePutModal);
            var updated = await _fileService.UpdateAsync(id, fileDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("File not found.");
        }

        // DELETE api/Files/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }
            var deleted = await _fileService.DeleteAsync(id);
            if (deleted)
            {
                return Ok(true);
            }
            return NotFound("File not found.");
        }
    }
}
