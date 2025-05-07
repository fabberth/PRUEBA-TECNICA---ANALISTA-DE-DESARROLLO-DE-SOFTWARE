import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHomeComponent } from './task-home.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('TaskHomeComponent', () => {
  let component: TaskHomeComponent;
  let fixture: ComponentFixture<TaskHomeComponent>;

  // Mock servicios
  const snackBarMock = {
    open: jasmine.createSpy('open')
  };

  const dialogMock = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(undefined)
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TaskHomeComponent,
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    component = TestBed.inject(TaskHomeComponent);
  });


  it('debe devolver solo tareas completadas cuando filterValue es "completed"', () => {
    component.tasks = [
      { id: 1, title: 'A', description: '', completed: true },
      { id: 2, title: 'B', description: '', completed: false }
    ];
    component.filterValue = 'completed';

    const result = component.getFilteredTasks();

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });



  it('debe agregar una tarea válida y mostrar un snackbar', () => {
    component.newTask = { id: 0, title: 'Nueva tarea', description: '', completed: false };

    const initialCount = component.tasks.length;

    component.addTask();

    expect(component.tasks.length).toBe(initialCount + 1);
    expect(snackBarMock.open).toHaveBeenCalledWith('Added element', 'OK', { duration: 3000 });
  });


  
  it('debe eliminar la tarea con el ID indicado y mostrar un snackbar', () => {
    component.tasks = [
      { id: 1, title: 'A', description: '', completed: false },
      { id: 2, title: 'B', description: '', completed: true }
    ];

    component.deleteTask(1);

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].id).toBe(2);
    expect(snackBarMock.open).toHaveBeenCalledWith('Deleted element', 'OK', { duration: 3000 });
  });


});
