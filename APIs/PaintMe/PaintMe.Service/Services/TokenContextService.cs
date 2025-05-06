using Microsoft.AspNetCore.Http;
using PaintMe.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Service.Services
{
    public class TokenContextService : ITokenContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("Id");
            return int.TryParse(userIdClaim?.Value, out var userId) ? userId : 0;
        }

        public string GetUserEmail()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirst("Email")?.Value;
        }
    }
}
