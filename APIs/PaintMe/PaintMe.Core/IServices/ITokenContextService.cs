using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaintMe.Core.IServices
{
    public interface ITokenContextService
    {
        int GetUserId();
        string GetUserEmail();
    }
}
