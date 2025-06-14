using AutoMapper;
using PaintMe.API.PostModals;
using PaintMe.Core.DTOs;
using static PaintMe.API.Controllers.AuthController;

namespace PaintMe.API
{
    public class MappingProfileApi : Profile
    {
        public MappingProfileApi()
        {
            CreateMap<UserPostModal, UserDto>().ReverseMap();
            CreateMap<ColoredFileDto, ColoredFilePostModal>().ReverseMap();
            CreateMap<FilePostModal, FileDto>().ReverseMap();
            CreateMap<RegisterPostModel, UserDto>().ReverseMap();
            CreateMap<UserDto, RegisterPostModel>().ReverseMap();
            CreateMap<CategoryPostModel, CategoryDto>().ReverseMap();
        }
    }
}
