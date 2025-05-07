import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.css'
})
export class TaskHomeComponent {
  tasks: Task[] = [
    { id: 100, title: 'Hola', description: 'Mundo', completed: true }
  ];

  newTask: Task = { id: 0, title: '', description: '', completed: false };

  addTask() {
    if (this.newTask.title.trim()) {
      const task = { ...this.newTask, id: (Math.floor(Math.random() * 900) + 100) };
      this.tasks.push(task);
      this.newTask = { id: 0, title: '', description: '', completed: false };
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.deleteTask(task.id);
  }
  
}
