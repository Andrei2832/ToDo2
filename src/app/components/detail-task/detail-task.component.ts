import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {Message} from "../../models/message";

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {

  task: Task = this.taskService.nowTask;

  constructor(
    public taskService:TaskService
  ) {}

  ngOnInit(): void {
  }

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  submit(){
  }

  changeDescription(text: string){
    this.taskService.changeDescription(text)
  }

  addMessage(textMes: string){
    if (textMes){
      this.taskService.addMessage(textMes.trim());
    }
  }
  deleteMessage(message: Message){

    this.taskService.deleteMessage(message);
  }
}
