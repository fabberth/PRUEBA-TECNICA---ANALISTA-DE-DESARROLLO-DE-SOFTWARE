using System.Text.RegularExpressions;

namespace WebAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime HireDate { get; set; }

        /// <summary>
        /// Valida la entidad
        /// </summary>
        /// <returns></returns>
        public bool Validate(out string msgError)
        {
            msgError = string.Empty;

            if (string.IsNullOrWhiteSpace(FirstName))
            {
                msgError = "Required parameter \"FirstName\"";
                return false;
            }
            if (string.IsNullOrWhiteSpace(LastName))
            {
                msgError = "Required parameter \"LastName\"";
                return false;
            }
            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (string.IsNullOrWhiteSpace(Email) ||
                !Regex.IsMatch(Email, pattern, RegexOptions.IgnoreCase))
            {
                msgError = "\"Email\" Invalid format";
                return false;
            }
            if (string.IsNullOrWhiteSpace(PhoneNumber))
            {
                msgError = "Required parameter \"FirstName\"";
                return false;
            }
            if (HireDate <= new DateTime(1753, 01, 01))
            {
                msgError = "\"HireDate\" Invalid";
                return false;
            }

            return true;
        }
    }
}
