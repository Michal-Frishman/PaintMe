using AutoMapper;
using PaintMe.API.PostModals;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

namespace PaintMe.API
{
    public class MappingProfileApi:Profile
    {
        public MappingProfileApi()
        {
            CreateMap<ColoredFilePostModal, ColoredFileDto>().ReverseMap();
            CreateMap<UserPostModal, UserDto>().ReverseMap();
            CreateMap<ColoredFileDto, ColoredFilePostModal>().ReverseMap();
            CreateMap<FilePostModal, FileDto>().ReverseMap();
        }
    }
}
