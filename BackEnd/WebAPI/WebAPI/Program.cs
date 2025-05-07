using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region DefaultConnection
var appsettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
var DefaultConnection = $"{Environment.GetEnvironmentVariable("DB_CONNECTION")}"; // DOCKER
if (string.IsNullOrEmpty(DefaultConnection))
{
    DefaultConnection = appsettings["DefaultConnection"];
}
if (string.IsNullOrEmpty(DefaultConnection))
{
    throw new Exception("\"DefaultConnection\" key not found");
}
#endregion

// configuramos la conexion a BD
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(DefaultConnection));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registramos el servicio
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
