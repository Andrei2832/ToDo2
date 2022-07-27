import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  constructor(
    public taskService:TaskService,
    public modalService:ModalService
  ) { }

  ngOnInit(): void {
  }

  submit(){
  }

  createTask(textTask: string, deadline: string){
    if (textTask && deadline){
      this.taskService.addTask(textTask,deadline);
      this.modalService.close();
    }
  }
}
