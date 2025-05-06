using Microsoft.AspNetCore.Mvc;
using PaintMe.Core.Entities;
using AutoMapper;
using PaintMe.Core.DTOs;
using PaintMe.API.PostModals;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PaintMe.Service.Services;
using PaintMe.Core.IServices;
using PaintMe.Core;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColoredFilesController : ControllerBase
    {
        private readonly IColoredFilesService _coloredFileService;
        private readonly IMapper _mapper;
        private readonly ITokenContextService _tokenContextService;

        public ColoredFilesController(IColoredFilesService coloredFileService, IMapper mapper, ITokenContextService tokenContextService)
        {
            _coloredFileService = coloredFileService;
            _mapper = mapper;
            _tokenContextService = tokenContextService;
        }

        // GET: api/ColoredFiles
        [HttpGet]
        public async Task<ActionResult<List<ColoredFileDto>>> Get()
        {
            var result = await _coloredFileService.GetListAsync();
            return Ok(result);
        }

        // GET api/ColoredFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ColoredFileDto>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var result = await _coloredFileService.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound("Colored file not found.");
            }
            return Ok(result);
        }
        [HttpGet("user/{id}")]
        [Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<List<ColoredFileDto>>> GetByUserId(int id)
        {
            //var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id");
            //if (userIdClaim == null)
            //{
            //    return Unauthorized("User ID not found in token.");
            //}
            //int userId = int.Parse(userIdClaim.Value);
            var userId = _tokenContextService.GetUserId();
            if (userId == 0) throw new UnauthorizedAccessException();
            await Console.Out.WriteLineAsync("userId: "+ userId);

            var result = await _coloredFileService.GetByUserIdAsync(userId);
            if (result == null)
            {
                return new List<ColoredFileDto>();
            }
            return Ok(result);
        }
        // POST api/ColoredFiles
        [HttpPost]
        [Authorize]

        public async Task<ActionResult<ColoredFileDto>> Post([FromBody] ColoredFilePostModal coloredFile)
        {
            if (coloredFile == null)
            {
                return BadRequest("Invalid colored file data.");
            }
            var coloredFileDto = _mapper.Map<ColoredFileDto>(coloredFile);
            var result = await _coloredFileService.AddAsync(coloredFileDto);
            if (result==null)
            {
                return BadRequest("Failed to create the colored file.");
            }
            return CreatedAtAction(nameof(GetById), new { id = coloredFileDto.Id }, coloredFileDto);
        }

        // PUT api/ColoredFiles/5
        [HttpPut("{id}")]
        [Authorize]

        public async Task<ActionResult<bool>> Put(int id, [FromBody] ColoredFilePostModal coloredFile)
        {
            if (id <= 0 || coloredFile == null)
            {
                return BadRequest("Invalid ID or colored file data.");
            }
            var coloredFileDto = _mapper.Map<ColoredFileDto>(coloredFile);
            var updated = await _coloredFileService.UpdateAsync(id, coloredFileDto);
            if (updated)
            {
                return Ok(true);
            }
            return NotFound("Colored file not found.");
        }

        // DELETE api/ColoredFiles/5
        [HttpDelete("{id}")]
        [Authorize]

        public async Task<ActionResult<bool>> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }
            var deleted = await _coloredFileService.DeleteAsync(id);
            if (deleted)
            {
                return Ok(true);
            }
            return NotFound("Colored file not found.");
        }
        [HttpGet("stats/colored-drawings-per-day")]
        public async Task<ActionResult<Dictionary<string, int>>> GetColoredDrawingsPerDay()
        {
            var result = await _coloredFileService.GetColoredDrawingsPerDayAsync();
            return Ok(result);
        }
        [HttpGet("stats/activity-hours")]
        public async Task<ActionResult<Dictionary<int, int>>> GetActivityHours()
        {
            var result = await _coloredFileService.GetPopularActivityHoursAsync();
            return Ok(result);
        }
    }
}
