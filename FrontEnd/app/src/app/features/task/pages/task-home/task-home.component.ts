import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTaskDialogComponent } from '../../dialogs/edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-task-home',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.css'
})
export class TaskHomeComponent {
  tasks: Task[] = [
    { id: 100, title: 'Hola', description: 'Mundo', completed: true }
  ];

  private _snackBar = inject(MatSnackBar);

  newTask: Task = { id: 0, title: '', description: '', completed: false };

  filterValue: string = 'all';

  constructor(private dialog: MatDialog) {}

  getFilteredTasks() {
    switch (this.filterValue) {
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'pending':
        return this.tasks.filter(t => !t.completed);
      default:
        return this.tasks;
    }
  }

  addTask() {
    if (this.newTask.title.trim()) {
      const task = { ...this.newTask, id: (Math.floor(Math.random() * 900) + 100) };
      this.tasks.push(task);
      this.newTask = { id: 0, title: '', description: '', completed: false };

      this._snackBar.open('Added element', 'OK', {duration: 3000});
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    
    this._snackBar.open('Deleted element', 'OK', {duration: 3000});
  }
  
  markAsCompleted(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '700px',
      data: { ...task }
    });
  
    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        const index = this.tasks.findIndex(t => t.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
          this._snackBar.open('Updated element', 'OK', {duration: 3000});
        }
      }
    });
  }

}
