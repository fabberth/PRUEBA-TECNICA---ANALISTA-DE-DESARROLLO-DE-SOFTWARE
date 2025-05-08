import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHomeComponent } from './task-home.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
      imports: [TaskHomeComponent],
      providers: [
        TaskHomeComponent,
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    component = TestBed.inject(TaskHomeComponent);

  });



  it('debería agregar una nueva tarea', () => {
    const initialLength = component.tasks.length;
  
    component.newTask = { id: 0, title: 'Nueva tarea', description: 'Descripción', completed: false };
    component.addTask();
  
    expect(component.tasks.length).toBe(initialLength + 1);
    expect(component.tasks[component.tasks.length - 1].title).toBe('Nueva tarea');
  });
  

  it('debería eliminar una tarea por ID', () => {
    const taskToDelete = { id: 999, title: 'Eliminar', description: '', completed: false };
    component.tasks.push(taskToDelete);
  
    component.deleteTask(999);
  
    expect(component.tasks.find(t => t.id === 999)).toBeUndefined();
  });
  
  it('debería filtrar solo las tareas completadas', () => {
    component.tasks = [
      { id: 1, title: 'Tarea 1', description: '', completed: true },
      { id: 2, title: 'Tarea 2', description: '', completed: false }
    ];
    component.filterValue = 'completed';
  
    const filtered = component.getFilteredTasks();
  
    expect(filtered.length).toBe(1);
    expect(filtered[0].completed).toBeTrue();
  });
  

});
