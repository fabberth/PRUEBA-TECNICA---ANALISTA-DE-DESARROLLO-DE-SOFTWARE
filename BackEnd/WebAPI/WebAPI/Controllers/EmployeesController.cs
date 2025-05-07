using Microsoft.AspNetCore.Mvc;
using WebAPI.Helpers;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService EmployeeService;
        public EmployeesController(IEmployeeService _employeeService)
        {
            EmployeeService = _employeeService;
        }

        [HttpGet("Employees")]
        public IActionResult GetEmployees()
        {
            try
            {
                var employees = EmployeeService.GetEmployees();

                if (employees.Any())
                {
                    return Ok(new ApiResponse<IList<Employee>>(employees));
                }

                return Ok(new ApiResponse<string>(true, "Records not found"));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>("API Error"));
            }
        }

        [HttpGet("Employees/{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            try
            {
                var employee = EmployeeService.GetEmployeeById(id);

                if (employee != null)
                {
                    return Ok(new ApiResponse<Employee>(employee));
                }

                return Ok(new ApiResponse<string>(true, "Records not found"));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>("API Error"));
            }
        }

        [HttpGet("GetEmployeesHiredAfter")]
        public IActionResult GetEmployeesHiredAfter(DateTime hireDate)
        {
            try
            {
                var employees = EmployeeService.GetEmployeesHiredAfter(hireDate);

                if (employees.Any())
                {
                    return Ok(new ApiResponse<IList<Employee>>(employees));
                }

                return Ok(new ApiResponse<string>(true, "Records not found"));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>("API Error"));
            }
        }

        [HttpPost("Employees")]
        public IActionResult CreateEmployee(Employee newEmployee)
        {
            try
            {
                if(!newEmployee.Validate(out string msgError))
                {
                    return Ok(new ApiResponse<string>(false, msgError));
                }

                var employee = EmployeeService.CreateEmployee(newEmployee);
                return Ok(new ApiResponse<Employee>(employee));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>("API Error"));
            }
        }

        [HttpPut("Employees/{id}")]
        public IActionResult UpdateEmployee(int id, Employee updatedEmployee)
        {
            try
            {
                if (!updatedEmployee.Validate(out string msgError))
                {
                    return Ok(new ApiResponse<string>(false, msgError));
                }

                updatedEmployee.EmployeeId = id;

                var employee = EmployeeService.UpdateEmployee(updatedEmployee);
                return Ok(new ApiResponse<Employee>(employee));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>($"API Error: {e.Message}"));
            }
        }

        [HttpDelete("Employees/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                EmployeeService.DeteleEmployee(id);
                return Ok(new ApiResponse<string>(true, "Record deleted"));

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e}");
                return Ok(new ApiResponse<string>("API Error"));
            }
        }
    }
}
