import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../../dialogs/edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-api-home',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  templateUrl: './api-home.component.html',
  styleUrl: './api-home.component.css'
})
export class ApiHomeComponent implements OnInit{

  private _snackBar = inject(MatSnackBar);
  
  todos: Todo[] = [];

  newTodo: Todo = {
    id: 0,
    todo: '',
    completed: false,
    userId: 0
  };
  
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getTodos().subscribe(response => {
      this.todos = response.todos;
    });
  }

  addTodo(){
    this.apiService.addTodo(this.newTodo).subscribe(success => {
      if (success) {
        this._snackBar.open('Created element', 'OK', {duration: 3000});
      } else {
        this._snackBar.open('Error API', 'OK', {duration: 3000});
      }
    });
  }

  openEditDialog(todo: Todo): void {
      const dialogRef = this.dialog.open(EditTodoDialogComponent, {
        width: '700px',
        data: { ...todo }
      });
    
      dialogRef.afterClosed().subscribe((result: Todo | undefined) => {
        if (result) {

          this.apiService.updateTodo(result).subscribe(success => {
            if (success) {
              this._snackBar.open('Updated element', 'OK', {duration: 3000});
            } else {
              this._snackBar.open('Error API', 'OK', {duration: 3000});
            }
          });
        }
      });
  }

  updateTodo(){
    this.apiService.updateTodo(this.newTodo).subscribe(success => {
      if (success) {
        this._snackBar.open('Updated element', 'OK', {duration: 3000});
      } else {
        this._snackBar.open('Error API', 'OK', {duration: 3000});
      }
    });
  }

  deleteTodo(id: number){
    this.apiService.deleteTodo(id).subscribe(success => {
      if (success) {
        this._snackBar.open('Eliminated element', 'OK', {duration: 3000});
      } else {
        this._snackBar.open('Error API', 'OK', {duration: 3000});
      }
    });
  }

}
