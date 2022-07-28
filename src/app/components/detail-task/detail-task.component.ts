import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ITask} from "../../models/task.interface";
import {TaskService} from "../../services/task.service";
import {IMessage} from "../../models/message.interface";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {

  public task: ITask = this.taskService.nowTask;

  constructor(
    public taskService: TaskService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
  }

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  submit(){
  }

  changeDescription(text: string): void{
    this.taskService.changeDescription(text)
  }

  addMessage(textMes: string): void{
    if (textMes){
      this.taskService.addMessage(textMes.trim());
    }
  }
  deleteMessage(message: IMessage): void{
    this.taskService.deleteMessage(message);
  }

  changeCondition(condition: string): void{
    this.taskService.changeCondition(condition)
    this.modalService.close()
  }

}
