//using Amazon.Extensions.NETCore.Setup;
//using Amazon.S3;
//using AutoMapper;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
//using PaintMe.API;
//using PaintMe.Core;
//using PaintMe.Core.DTOs;
//using PaintMe.Core.Entities;
//using PaintMe.Data;
//using PaintMe.Data.Repository;
//using PaintMe.Service.Repositories;
//using PaintMe.Service.Services;
//using System.Text;
//using File = PaintMe.Core.Entities.File;

//var builder = WebApplication.CreateBuilder(args);


//builder.Services.AddControllers();
//builder.Services.AddScoped<IUserService, UsersService>();
//builder.Services.AddScoped<IFilesService, FilesService>();
//builder.Services.AddScoped<IColoredFilesService, ColoredFilesService>();
////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//builder.Services.AddScoped<ICategoryService, CategoryService>();

//builder.Services.AddScoped<IFilesRepository, FilesRepository>();
//builder.Services.AddScoped<IColoredFileRepository, ColoredFilesRepository>();
//builder.Services.AddScoped<IUserRepository, UsersRepository>();
//builder.Services.AddScoped<IRoleRepository, RoleRepository>();
//builder.Services.AddScoped<IUserRolesRepository, UserRoleRepository>();
//builder.Services.AddScoped<ICategoryRepository, CategoriesRepository>();
////builder.Services.AddScoped<IUserRoleService, UserRoleService>();

//builder.Services.AddScoped<AuthService>();


//builder.Services.AddDbContext<DataContext>(option =>
//{
//    option.UseSqlServer("Data Source=DESKTOP-4R0K21U\\SQLEXPRESS;Initial Catalog=PaintMe4;Integrated Security=false;  Trusted_Connection = SSPI; MultipleActiveResultSets = true; TrustServerCertificate = true");
//});

//builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfileApi));
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        builder => builder.AllowAnyOrigin() // Allow all origins
//                          .AllowAnyMethod()
//                          .AllowAnyHeader());
//});
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//    };
//});

//// הוספת הרשאות מבוססות-תפקידים
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
//    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
//    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
//});
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

//    // הגדרת Credentials באופן ידני
//    var credentials = new Amazon.Runtime.BasicAWSCredentials(
//        builder.Configuration["AWS:AccessKey"],
//        builder.Configuration["AWS:SecretKey"]
//    );

//    // הגדרת Region
//    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);


//    return new AmazonS3Client(credentials, region);
//});


//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//app.UseHttpsRedirection();
//app.UseCors("AllowAll");

//app.UseAuthentication();  // מאוד חשוב
//app.UseAuthorization();

//app.MapControllers();

//app.Run();
using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using AutoMapper;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PaintMe.API;
using PaintMe.Core;
using PaintMe.Core.DTOs;
using PaintMe.Core.Entities;
using PaintMe.Data;
using PaintMe.Data.Repository;
using PaintMe.Service.Repositories;
using PaintMe.Service.Services;
using Sprache;
using System.Text;
Env.Load();


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IUserService, UsersService>();
builder.Services.AddScoped<IFilesService, FilesService>();
builder.Services.AddScoped<IColoredFilesService, ColoredFilesService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IFilesRepository, FilesRepository>();
builder.Services.AddScoped<IColoredFileRepository, ColoredFilesRepository>();
builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IUserRolesRepository, UserRoleRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoriesRepository>();

builder.Services.AddScoped<AuthService>();

//builder.Services.AddDbContext<DataContext>(option =>
//{
//    option.UseSqlServer("server=bi3apewaqacstqkikzoz-mysql.services.clever-cloud.com;port=3306;database=bi3apewaqacstqkikzoz;user=urnmykvabrbo50v5;password=6VDQV4vQZp7TPItpS35M;");
//    //option.UseSqlServer("Data Source=DESKTOP-4R0K21U\\SQLEXPRESS;Initial Catalog=PaintMe5;Integrated Security=false; Trusted_Connection = SSPI; MultipleActiveResultSets = true; TrustServerCertificate = true");
//});

var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
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
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});

// הוספת הגדרות AWS
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

//    // הגדרת Credentials באופן ידני
//    var credentials = new Amazon.Runtime.BasicAWSCredentials(
//        builder.Configuration["AWS:AccessKey"],
//        builder.Configuration["AWS:SecretKey"]
//    );

//    // הגדרת Region
//    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);

//    return new AmazonS3Client(credentials, region);
//});
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

//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}
app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

