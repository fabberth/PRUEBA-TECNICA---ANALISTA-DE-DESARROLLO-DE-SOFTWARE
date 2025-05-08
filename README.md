# PRUEBA TECNICA - ANALISTA DE DESARROLLO DE SOFTWARE

# Manueles:

	Back-End -> BackEnd/Manual.txt
	Front-End -> FrontEnd/Manual.txt

---

# Back-End

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

---

# Front-End

Este proyecto fue desarrollado que utiliza **Angular 19** y está dividido en dos funcionalidades principales:

1. **CRUD completo de tareas locales** (sin conexión a API), donde se puede:
   - Crear, leer, actualizar y eliminar tareas.
   - Cambiar el estado de las tareas (completadas o pendientes).
   - Utiliza `MatDialog` para edición y `MatSnackBar` para retroalimentación visual.

2. **CRUD de tareas con integración a una [API externa]([https://angular.io/docs](https://dummyjson.com/docs/todos#todos-all)) **, evaluando:
   - Consumo de servicios HTTP.
   - Gestión de estados asincrónicos.
   - Separación de responsabilidades entre componentes, servicios y modelos.

---

## 🧱 Arquitectura del Proyecto

La estructura del proyecto está organizada en una carpeta `features`, separando las funcionalidades principales:

src/
└── app/
└── features/
├── api-integration/ # Funcionalidades con API
│ ├── dialogs/
│ ├── models/
│ ├── pages/
│ └── services/
└── task/ # Funcionalidades locales
├── dialogs/
├── models/
└── pages/
