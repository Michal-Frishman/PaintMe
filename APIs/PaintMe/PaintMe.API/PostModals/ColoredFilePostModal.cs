using PaintMe.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaintMe.API.PostModals
{
    public class ColoredFilePostModal
    {
        public int OriginalDrawingId { get; set; }
        public string Name { get; set; }

        public string ColoredImageUrl { get; set; }
        public int UserId { get; set; }
    }
}
