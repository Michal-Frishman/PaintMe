using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaintMe.API.PostModals;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.Core.IServices;
using PaintMe.Service.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        readonly ICategoryService _categoryService;
        readonly IMapper _mapper;

        public CategoriesController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> Get() // שונה ל-Task<ActionResult<IEnumerable<CategoryDto>>>
        {
            var categories = await _categoryService.GetListAsync(); 
            return (categories);
        }


        // GET api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id) // שונה ל-Task<ActionResult<CategoryDto>>
        {
            if (id < 0) return BadRequest();

            var result = await _categoryService.GetByIdAsync(id); // הוספת await
            if (result == null) return NotFound();

            return Ok(result);
        }

        // POST api/Category
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<bool>> Post([FromBody] CategoryPostModel category)
        {
            if (category == null) return BadRequest("User data is required");
            var categoryDto = _mapper.Map<CategoryDto>(category); // שונה ל-CategoryDto
            var result = await _categoryService.AddAsync(categoryDto); // שונה ל-AddAsync
            if (!result) return BadRequest("User already exists or could not be added");
            return Ok(result);
        }

        // PUT api/Category/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<bool>> Put(int id, [FromBody] CategoryPostModel category)
        {
            if (category == null || id < 0) return BadRequest("Invalid input");
            var categoryDto = _mapper.Map<CategoryDto>(category); // שונה ל-CategoryDto
            var result = await _categoryService.UpdateAsync(id, categoryDto); // שונה ל-UpdateAsync
            if (!result) return NotFound("User not found");
            return Ok(result);
        }

        // DELETE api/Category/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<bool>> Delete(int id)
        {
            if (id < 0) return BadRequest("Invalid input");
            bool result = await _categoryService.DeleteAsync(id); // שונה ל-DeleteAsync
            return result ? Ok(result) : NotFound("User not found or could not be deleted");
        }
    }
}
