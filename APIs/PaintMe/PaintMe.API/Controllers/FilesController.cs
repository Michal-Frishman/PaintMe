using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.API.PostModals;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PaintMe.Core.IServices;
using PaintMe.Core;
using PaintMe.Service.Services;
using System.Text.Json;
using System.Text;
using System.IO;

namespace PaintMe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFilesService _fileService;
        private readonly IMapper _mapper;
        private static readonly HttpClient client = new HttpClient();

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
        [HttpGet("user-and-admin")]
        [HttpGet("user-and-admin")]
        public async Task<IActionResult> GetFilesByUserOrAdmins()
        {
            var files = await _fileService.GetFilesByUserOrAdminsAsync();
            return Ok(files);
        }


        [HttpGet("admin-only")]
        public async Task<IActionResult> GetFilesByAdminsOnly()
        {
            var files = await _fileService.GetFilesByAdminsOnlyAsync();
            return Ok(files);
        }

        [HttpGet("user")]
        public async Task<ActionResult<List<FileDto>>> GetByUserId()
        {
            var files = await _fileService.GetDataByUserId();
            if (files == null || files.Count == 0)
                return NotFound("No files.");
            return Ok(files);
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
        [Authorize]
        public async Task<ActionResult<FileDto>> Post([FromBody] FilePostModal filePostModal)
        {
            if (filePostModal == null)
            {
                return BadRequest("Invalid file data.");
            }

            var fileDto = _mapper.Map<FileDto>(filePostModal);
            var result = await _fileService.AddAsync(fileDto);
            if (result == null)
            {
                return BadRequest("Failed to create file.");
            }
            return CreatedAtAction(nameof(GetById), new { id = fileDto.Id }, fileDto);
        }

        // PUT api/Files/5
        [HttpPut("{id}")]
        [Authorize]
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
        [Authorize]
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
        // GET api/Files/category/{categoryId}
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<List<FileDto>>> GetByCategory(int categoryId)
        {
            if (categoryId <= 0)
            {
                return BadRequest("Invalid category ID.");
            }

            var result = await _fileService.GetByCategoryDataAsync(categoryId);
            if (result == null || result.Count == 0)
            {
                return new List<FileDto>();
            }
            return Ok(result);
        }
        [HttpGet("aiDrawingInstructions")]
        public async Task<string> AiDrawingInstructions([FromQuery] string path)
        {
            string base64Image = await ConvertImageToBase64Async(path);

            string apiKey = "AIzaSyDmYwXGXUSLI1n2pKpow5tnbGtKectLYoM";
            string endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}";

            var payload = new
            {
                contents = new[]
                {
                new {
                    parts = new object[]
                    {
                        new { text = "ללא פתיח תכתוב את הכותרת הוראות לצביעה: תכתוב בסוף איחולי צביעה מהנה .תן לי הוראות מפורטות איך לצבוע את התמונה הנתונה, תן פרוט על כל אלמנט בתמונה באיזה צבע לצבוע אותו" },
                        new {
                            inlineData = new {
                                mimeType = "image/jpeg",
                                data = base64Image
                            }
                        }
                    }
                }
            }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(endpoint, content);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return $"API Error: {result}";
            }

            using JsonDocument doc = JsonDocument.Parse(result);
            var root = doc.RootElement;

            if (root.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0)
            {
                var firstCandidate = candidates[0];

                if (firstCandidate.TryGetProperty("content", out var content2) &&
                    content2.TryGetProperty("parts", out var parts) &&
                    parts.GetArrayLength() > 0)
                {
                    var firstPart = parts[0];
                    if (firstPart.TryGetProperty("text", out var text))
                    {
                        return text.GetString();
                    }
                }
            }

            return "No text found in the response.";
        }
        [HttpGet("aiDrawingFeedback")]
        public async Task<string> AiDrawingFeedback([FromQuery] string path)
        {
            string base64Image = await ConvertImageToBase64Async(path);

            string apiKey = "AIzaSyDmYwXGXUSLI1n2pKpow5tnbGtKectLYoM";
            string endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}";

            var payload = new
            {
                contents = new[]
                {
                new {
                    parts = new object[]
                    {
                        new { text = "השתמש בלשון זכר לאורך כל המשוב. אנא נתח את התמונה הצבועה המצורפת. תן משוב חיובי ומעודד שמתמקד בהצעות להוספת צבעים או אזורים שבהם ניתן להעשיר את הציור עם צבעים משלימים, מבלי להציע תיקונים או שינויים בצבעים שכבר קיימים. השתמש בשפה ידידותית ומניעה להמשך יצירה."},
                        new {
                            inlineData = new {
                                mimeType = "image/jpeg",
                                data = base64Image
                            }
                        }
                    }
                }
            }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(endpoint, content);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return $"API Error: {result}";
            }

            using JsonDocument doc = JsonDocument.Parse(result);
            var root = doc.RootElement;

            if (root.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0)
            {
                var firstCandidate = candidates[0];

                if (firstCandidate.TryGetProperty("content", out var content2) &&
                    content2.TryGetProperty("parts", out var parts) &&
                    parts.GetArrayLength() > 0)
                {
                    var firstPart = parts[0];
                    if (firstPart.TryGetProperty("text", out var text))
                    {
                        return text.GetString();
                    }
                }
            }

            return "No text found in the response.";
        }

        private static async Task<string> ConvertImageToBase64Async(string imagePathOrUrl)
        {

            using var httpClient = new HttpClient();
            byte[] imageBytes = await httpClient.GetByteArrayAsync(imagePathOrUrl);
            return Convert.ToBase64String(imageBytes);
        }

    }


}
