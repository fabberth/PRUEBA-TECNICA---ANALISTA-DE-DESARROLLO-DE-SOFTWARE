
-- Crear la tabla Employees
IF OBJECT_ID('dbo.Employees', 'U') IS NULL
BEGIN
    
	CREATE TABLE dbo.Employees (
		EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
		FirstName NVARCHAR(50) NOT NULL,
		LastName NVARCHAR(50) NOT NULL,
		Email NVARCHAR(100),
		PhoneNumber NVARCHAR(15),
		HireDate DATETIME NOT NULL
	);

END;
GO

-- Crear el procedimiento almacenado
CREATE OR ALTER PROCEDURE GetEmployeesHiredAfter
    @HireDate DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        EmployeeId,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        HireDate
    FROM 
        dbo.Employees
    WHERE 
        HireDate > @HireDate
    ORDER BY 
        HireDate ASC;
END;


--	Datos de prueba

--INSERT INTO dbo.Employees (FirstName, LastName, Email, PhoneNumber, HireDate)
--VALUES 
--('Ana', 'Gómez', 'a.gomez@example.com', '5551234', '2025-05-06'),
--('Luis', 'Martínez', 'l.martinez@example.com', '5555678', '2025-05-05')


-- 	Ejecutar SP

--EXEC	[dbo].[GetEmployeesHiredAfter] @HireDate = N'2025-05-05'