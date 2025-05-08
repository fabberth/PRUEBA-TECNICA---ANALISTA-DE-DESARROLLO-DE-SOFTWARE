import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo, TodoResponse } from '../models/todo.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://dummyjson.com/';

 /**
 * Obtiene listado de la entidad Todos
 */
  getTodos(): Observable<TodoResponse> {

    return this.http.get<TodoResponse>(this.apiUrl + 'todos').pipe(
      catchError(error => {
        console.error('Error al obtener los todos:', error);
        const fallback: TodoResponse = {
          todos: [],
          total: 0,
          skip: 0,
          limit: 0
        };
  
        return of(fallback);
      })
    );
    
  }

  /**
   * Añade una entidad Todo
   */
  addTodo(todo: Todo): Observable<Boolean> {

    const body = {
      todo: todo.todo,
      completed: todo.completed,
      userId: todo.userId
    };

    return this.http.post(this.apiUrl + 'add', JSON.stringify(body)).pipe(
      map(response => {
        // Si viene un id, asumimos éxito
        return !!response && typeof response === 'object' && 'id' in response;
      }),
      catchError(error => {
        console.error('Error al agregar tarea:', error);
        return of(false); // Retorna false en caso de error
      })
    );
    
  }

  /**
   * Actualiza entidad Todo
   */
  updateTodo(todo: Todo): Observable<Boolean> {

    const body = {
      todo: todo.todo,
      completed: todo.completed,
      userId: todo.userId
    };

    return this.http.put(this.apiUrl + 'todos/' + todo.id, JSON.stringify(body)).pipe(
      map(response => {
        // Si viene un id, asumimos éxito
        return !!response && typeof response === 'object' && 'id' in response;
      }),
      catchError(error => {
        console.error('Error al midificar tarea:', error);
        return of(false); // Retorna false en caso de error
      })
    );
    
  }

  /**
   * Elimina entidad Todo
   * @param id 
   * @returns 
   */
  deleteTodo(id: number): Observable<boolean> {
    
    return this.http.delete(this.apiUrl + 'todos/' + id).pipe(
      map(() => true), // Si no falla, devuelve true
      catchError(error => {
        console.error(`Error eliminando tarea con id ${id}:`, error);
        return of(false); // Si hay error, devuelve false
      })
    );
  }

}
