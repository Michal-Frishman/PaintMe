using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PaintMe.API;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.Data;
using PaintMe.Data.Repository;
using PaintMe.Service;
using PaintMe.Service.Services;
using File = PaintMe.Core.Entities.File;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IService<UserDto>, UsersService>();
builder.Services.AddScoped<IService<FileDto>, FilesService>();
builder.Services.AddScoped<IService<ColoredFileDto>, ColoredFilesService>();

builder.Services.AddScoped<IRepository<File>, FilesRepository>();
builder.Services.AddScoped<IRepository<ColoredFile>, ColoredFilesRepository>();
builder.Services.AddScoped<IRepository<User>, UsersRepository>();

builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer("Data Source=DESKTOP-4R0K21U\\SQLEXPRESS;Initial Catalog=PaintMe;Integrated Security=false;  Trusted_Connection = SSPI; MultipleActiveResultSets = true; TrustServerCertificate = true");
});

builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfileApi));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin() // Allow all origins
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add CORS middleware here
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
