import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskHomeComponent } from './features/task/pages/task-home/task-home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
