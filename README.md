# PRUEBA-TECNICA - ANALISTA DE DESARROLLO DE SOFTWARE

# BackEnd

Este proyecto es una API RESTful desarrollada con **ASP.NET Core 8** y **Entity Framework Core**, que expone operaciones CRUD para la entidad `Employees`. Utiliza una arquitectura limpia, preparada para pruebas automatizadas y despliegue en contenedores.

---

## 🚀 Características

- ✅ CRUD completo de empleados
- ✅ Arquitectura en capas (Controller, Service, Data, Models)
- ✅ Entity Framework Core + SQL Server
- ✅ Respuestas estándar con `ApiResponse`
- ✅ Pruebas unitarias con xUnit
- ✅ Preparado para Docker

---

## 🧱 Estructura del proyecto

WebAPI/
├── Controllers/ # Controladores HTTP
├── Services/ # Lógica de negocio
├── Data/ # EF Core DbContext
├── Models/ # Entidades de dominio
├── Helpers/ # Utilidades como ApiResponse
├── appsettings.json # Configuración del proyecto
├── Dockerfile # Contenedor Docker
└── WebAPI.csproj

WebAPI.Tests/
└── UnitTest1.cs # Proyecto de pruebas (xUnit)