import { Component } from '@angular/core';
import {TaskService} from "./services/task.service";
import {IColumnTask} from "./models/column-task.interface";
import {ModalService} from "./services/modal.service";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ToDo2';
  columnTasks = this.localStorageService.columnTasks

  constructor(
    private taskService: TaskService,
    public modalService: ModalService,
    private localStorageService:LocalStorageService,
  ) {}

  public checkTasks(): boolean {
    return !!this.localStorageService.getLocalStorage().length
  }
  public update(): void{
    this.columnTasks = this.localStorageService.columnTasks
  }

  public createColumn(): void{
    this.modalService.titleModal = 'Добавить колонку';
    this.modalService.open();
  }


}
