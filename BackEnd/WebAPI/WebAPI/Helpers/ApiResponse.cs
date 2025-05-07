namespace WebAPI.Helpers
{
    public class ApiResponse<T>
    {
        /// <summary>
        /// Indica si la operación fue exitosa
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Mensaje de éxito o error
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Resultado principal
        /// </summary>
        public T Data { get; set; }
        /// <summary>
        /// Código de error para identificar el fallo
        /// </summary>
        public string ErrorCode { get; set; } = "E-500";

        public ApiResponse() { }

        public ApiResponse(bool success, string message, T data = default, string errorCode = null)
        {
            Success = success;
            Message = message;
            Data = data;
            ErrorCode = errorCode;
        }

        /// <summary>
        /// Constructor para éxito con datos
        /// </summary>
        /// <param name="data"></param>
        /// <param name="message"></param>
        public ApiResponse(T data, string message = "Successful operation")
        {
            Success = true;
            Message = message;
            Data = data;
            ErrorCode = null;
        }

        /// <summary>
        /// Constructor para error
        /// </summary>
        /// <param name="message"></param>
        /// <param name="errorCode"></param>
        public ApiResponse(string message, string errorCode = null)
        {
            Success = false;
            Message = message;
            Data = default;
            ErrorCode = errorCode;
        }
    }
}
