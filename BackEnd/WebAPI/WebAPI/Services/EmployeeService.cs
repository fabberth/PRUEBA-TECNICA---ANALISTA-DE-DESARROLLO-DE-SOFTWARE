using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebAPI.Services
{
    public interface IEmployeeService
    {
        /// <summary>
        /// Obtiene un empleado por ID
        /// </summary>
        /// <param name="EmployeeId"></param>
        /// <returns></returns>
        Employee GetEmployeeById(int EmployeeId);

        /// <summary>
        /// Obtiene lista de empleados
        /// </summary>
        /// <returns></returns>
        IList<Employee> GetEmployees();

        /// <summary>
        /// Crea un nuevo empleado
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>Employee</returns>
        Employee CreateEmployee(Employee newEmployee);

        /// <summary>
        /// Actualiza un empleado
        /// </summary>
        /// <param name="updatedEmployee"></param>
        /// <returns></returns>
        Employee UpdateEmployee(Employee updatedEmployee);

        /// <summary>
        /// Elimina un empleado
        /// </summary>
        /// <param name="employeeId"></param>
        void DeteleEmployee(int employeeId);

        /// <summary>
        /// obtiene todos los empleados que fueron contratados después de una fecha específica
        /// </summary>
        /// <param name="hireDate"></param>
        /// <returns></returns>
        IList<Employee> GetEmployeesHiredAfter(DateTime hireDate);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext dbContext;
        public EmployeeService(AppDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public Employee GetEmployeeById(int employeeId)
        {
            return dbContext.Employees.AsQueryable()
                .Where(x=> x.EmployeeId == employeeId).FirstOrDefault();
        }

        public IList<Employee> GetEmployees()
        {
            return dbContext.Employees.ToList();
        }

        public Employee CreateEmployee(Employee newEmployee)
        {
            newEmployee.EmployeeId = 0;
            dbContext.Employees.Add(newEmployee);
            dbContext.SaveChanges();

            return newEmployee;
        }

        public Employee UpdateEmployee(Employee updatedEmployee)
        {
            var employee = GetEmployeeById(updatedEmployee.EmployeeId);

            if (employee == null)
                throw new Exception("Records not found");

            employee.FirstName = updatedEmployee.FirstName;
            employee.LastName = updatedEmployee.LastName;
            employee.Email = updatedEmployee.Email;
            employee.PhoneNumber = updatedEmployee.PhoneNumber;
            employee.HireDate = updatedEmployee.HireDate;

            dbContext.SaveChanges();

            return updatedEmployee;
        }

        public void DeteleEmployee(int employeeId)
        {
            var employee = GetEmployeeById(employeeId);

            if (employee == null)
                return;

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();
        }

        public IList<Employee> GetEmployeesHiredAfter(DateTime hireDate)
        {
            return dbContext.Employees.FromSqlRaw("EXEC GetEmployeesHiredAfter @HireDate = {0}", hireDate).ToList();
        }
    }
}
