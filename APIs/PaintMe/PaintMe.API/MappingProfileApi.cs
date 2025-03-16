using AutoMapper;
using PaintMe.API.Controllers;
using PaintMe.API.PostModals;
using PaintMe.API.PutModels;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;

namespace PaintMe.API
{
    public class MappingProfileApi : Profile
    {
        public MappingProfileApi()
        {
            CreateMap<UserPostModal, UserDto>().ReverseMap();
            CreateMap<ColoredFileDto, ColoredFilePostModal>().ReverseMap();
            CreateMap<FilePostModal, FileDto>().ReverseMap();
            //CreateMap<RegisterModel, UserDto>().ReverseMap();
            // מיפוי RegisterModel ל- UserDto
            CreateMap<RegisterModel, UserDto>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // יתעלם משדה Id, לא קיים ב- RegisterModel
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow)) // מגדיר ערך ברירת מחדל ל- CreatedAt
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow)) // מגדיר ערך ברירת מחדל ל- UpdatedAt
                .ReverseMap();  // ממפה גם בכיוון ההפוך

            // מיפוי של UserDto ל- RegisterModel
            CreateMap<UserDto, RegisterModel>()
                .ForMember(dest => dest.Password, opt => opt.Ignore()) // יתעלם משדה Password, לא קיים ב- RegisterModel
                .ForMember(dest => dest.RoleName, opt => opt.Ignore()) // יתעלם משדה RoleName, לא קיים ב- RegisterModel
                .ReverseMap();
            CreateMap<CategoryPostModel, CategoryDto>().ReverseMap();



        }
    }
}
