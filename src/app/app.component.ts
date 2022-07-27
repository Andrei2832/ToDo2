import { Component } from '@angular/core';
import {TaskService} from "./services/task.service";
import {ColumnTask} from "./models/columnTask";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ToDo2';
  checkTask: ColumnTask[] = this.taskService.columnTasks

  update(){
    this.checkTask  = this.taskService.columnTasks
  }

  constructor(
    private taskService: TaskService,
    public modalService:ModalService
  ) {
  }
}
