import { Component } from '@angular/core';
import {TaskService} from "./services/task.service";
import {IColumnTask} from "./models/column-task.interface";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ToDo2';
  columnTasks: IColumnTask[] = this.taskService.columnTasks

  constructor(
    public taskService: TaskService,
    public modalService:ModalService
  ) {}

  public checkTasks(): boolean {
    return !!this.taskService.columnTasks.length
  }
  public update(){
    this.columnTasks  = this.taskService.columnTasks
  }

  createColumn(){
    this.modalService.titleModal = 'Добавить колонку';
    this.modalService.open();
  }


}
