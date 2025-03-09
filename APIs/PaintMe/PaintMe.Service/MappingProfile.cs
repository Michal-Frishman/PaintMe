using AutoMapper;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using File = PaintMe.Core.Entities.File;

namespace PaintMe.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ColoredFile, ColoredFileDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<File, FileDto>().ReverseMap();
        }
    }
}
