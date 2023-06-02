import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.builder.group({
      item: ['', Validators.required]
    })
  }

}
