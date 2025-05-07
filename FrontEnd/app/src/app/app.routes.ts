import { Routes } from '@angular/router';
import { ApiHomeComponent } from './features/api-integration/pages/api-home/api-home.component';
import { TaskHomeComponent } from './features/task/pages/task-home/task-home.component';

export const routes: Routes = [
    { path: '', component: TaskHomeComponent },
    { path: 'api', component: ApiHomeComponent },
];
