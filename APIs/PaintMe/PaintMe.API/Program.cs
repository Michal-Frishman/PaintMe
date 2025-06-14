using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using AutoMapper;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PaintMe.API;
using PaintMe.Core;
using PaintMe.Core.IServices;
using PaintMe.Data;
using PaintMe.Data.Repository;
using PaintMe.Service.Repositories;
using PaintMe.Service.Services;
using System.Text;
using System.Text.Json;

Env.Load();


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<IUserService, UsersService>();
builder.Services.AddScoped<IFilesService, FilesService>();
builder.Services.AddScoped<IColoredFilesService, ColoredFilesService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ITokenContextService, TokenContextService>();

builder.Services.AddScoped<IFilesRepository, FilesRepository>();
builder.Services.AddScoped<IColoredFileRepository, ColoredFilesRepository>();
builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();  
builder.Services.AddScoped<ICategoryRepository, CategoriesRepository>();

builder.Services.AddScoped<AuthService>();

builder.Services.AddDbContext<DataContext>(options =>
{
    var x = builder.Configuration["CONNECTION_STRING"];
    options.UseMySql(x,
                   ServerVersion.AutoDetect(x)
        );
});

builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfileApi));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });


});
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserOrAdmin", policy => policy.RequireRole("User", "Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:KEY"]))
    };

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception is SecurityTokenExpiredException)
            {
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync(
                    JsonSerializer.Serialize(new { message = "Token has expired" })
                );
            }
            else if (context.Exception is SecurityTokenInvalidSignatureException)
            {
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync("Invalid token signature.");
            }
            else
            {
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync("Authentication failed.");
            }
        }
    };
});

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

    var credentials = new Amazon.Runtime.BasicAWSCredentials(
        builder.Configuration["AWS_ACCESS_KEY_ID"],
        builder.Configuration["AWS_SECRET_ACCESS_KEY"]
    );

    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS_REGION"]);

    return new AmazonS3Client(credentials, region);
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

