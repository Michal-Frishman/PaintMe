using AutoMapper;
using PaintMe.API.PostModals;
using PaintMe.API.PutModels;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

namespace PaintMe.API
{
    public class MappingProfileApi:Profile
    {
        public MappingProfileApi()
        {
            CreateMap<UserPostModal, UserDto>().ReverseMap();
            CreateMap<ColoredFileDto, ColoredFilePostModal>().ReverseMap();
            CreateMap<FilePostModal, FileDto>().ReverseMap();
            //CreateMap<UserPutModel,UserDto>().ReverseMap();
        }
    }
}
