using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Tests
{
    public class UnitTest1
    {
        private AppDbContext GetTestDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase("TestDb")
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public void GetByIdAsync_ReturnsEmployee_WhenExists()
        {
            // Arrange
            var context = GetTestDbContext();
            var employee = new Employee { FirstName = "Ana", LastName = "García", Email = "a.garcia@gmail.com", PhoneNumber = "351353", HireDate = DateTime.UtcNow };
            context.Employees.Add(employee);
            context.SaveChanges();

            var service = new EmployeeService(context);

            // Act
            var result = service.GetEmployeeById(employee.EmployeeId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Ana", result.FirstName);
        }
    }
}