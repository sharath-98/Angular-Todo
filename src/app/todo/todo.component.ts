import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  completed: ITask[] = [];
  updatedId !: number;
  isEditEnabled: boolean = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.builder.group({
      item: ['', Validators.required]
    })
  }

  addTask(){
    if(this.isEditEnabled){
      this.tasks[this.updatedId].description = this.todoForm.value.item;
      this.isEditEnabled = false;
    } else{
      this.tasks.push({
      description:this.todoForm.value.item,
      done: false
    })
    }
    // this.todoForm.reset();
    this.todoForm.get('item')?.reset();
  }

  deleteTask(index:number){
    this.tasks.splice(index, 1);
  }

  deleteInProgressTask(index: number){
    this.inProgress.splice(index, 1);
  }

  deleteCompleted(index: number){
    this.completed.splice(index, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  EditTask(index: number, item: ITask){
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedId = index;
    this.isEditEnabled = true;
  }

}
