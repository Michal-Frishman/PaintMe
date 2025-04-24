////using Microsoft.AspNetCore.Mvc;

////// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

////namespace PaintMe.API.Controllers
////{
////    [Route("api/[controller]")]
////    [ApiController]
////    public class UploadController : ControllerBase
////    {
////        // GET: api/<UploadController>
////        [HttpGet]
////        public IEnumerable<string> Get()
////        {
////            return new string[] { "value1", "value2" };
////        }

////        // GET api/<UploadController>/5
////        [HttpGet("{id}")]
////        public string Get(int id)
////        {
////            return "value";
////        }

////        // POST api/<UploadController>
////        [HttpPost]
////        public void Post([FromBody] string value)
////        {
////        }

////        // PUT api/<UploadController>/5
////        [HttpPut("{id}")]
////        public void Put(int id, [FromBody] string value)
////        {
////        }

////        // DELETE api/<UploadController>/5
////        [HttpDelete("{id}")]
////        public void Delete(int id)
////        {
////        }
////    }
////}using Amazon.S3;
//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("api/upload")]
//public class UploadController : ControllerBase
//{
//    private readonly IAmazonS3 _s3Client;

//    public UploadController(IAmazonS3 s3Client)
//    {
//        _s3Client = s3Client;
//    }

//    [HttpGet("presigned-url")]
//    public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//    {
//        var request = new GetPreSignedUrlRequest
//        {
//            BucketName = "paintmebuket",
//            Key = fileName,
//            Verb = HttpVerb.PUT,
//            Expires = DateTime.UtcNow.AddMinutes(5),
//            ContentType = "image/jpeg" // או סוג הקובץ המתאים
//        };

//        string url = _s3Client.GetPreSignedURL(request);
//        return Ok(new { url });
//    }
//}
using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/upload")]
public class UploadController : ControllerBase
{
    private readonly IAmazonS3 _s3Client;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png", ".gif", ".bmp" }; // סיומות תמונה
    private readonly IConfiguration _configuration;
    public UploadController(IAmazonS3 s3Client, IConfiguration configuration)
    {
        _configuration = configuration;
        _s3Client = s3Client;
    }

    [HttpGet("presigned-url")]
    public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLower();

        if (!_allowedExtensions.Contains(extension))
        {
            return BadRequest("Only image files are allowed (.jpg, .jpeg, .png, .gif, .bmp)");
        }

        string contentType = extension switch
        {
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".bmp" => "image/bmp",
            _ => "application/octet-stream"
        };

        var request = new GetPreSignedUrlRequest
        {
            BucketName = "paintmebuket",
            Key = fileName,
            Verb = HttpVerb.PUT,
            Expires = DateTime.UtcNow.AddMinutes(15),
            ContentType = "application/octet-stream"
        };

        string url = _s3Client.GetPreSignedURL(request);
        return Ok(new { url });
    }
    [HttpGet("download-url/{fileName}")]
    public async Task<string> GetDownloadUrlAsync(string fileName)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = "paintmebuket",
            Key = fileName,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.AddDays(300),
        };

        return _s3Client.GetPreSignedURL(request);
    }
}
