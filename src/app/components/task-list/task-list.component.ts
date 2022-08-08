import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {IColumnTask} from "../../models/column-task.interface";
import {ModalService} from "../../services/modal.service";
import {ITask} from "../../models/task.interface";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() task!: IColumnTask

  public columnTasks = this.localStorageService.columnTasks

  constructor(
    private taskService: TaskService,
    public modalService: ModalService,
    private localStorageService:LocalStorageService,
  ) {}

  public ngOnInit(): void {
  }

  public showModal(nowColumn: IColumnTask): void{
    this.localStorageService.nowColumnTask = nowColumn;
    this.modalService.titleModal = 'Добавить задачу';
    this.modalService.open();
  }

  public showDetailTask(task: ITask): void{
    this.localStorageService.nowTask = task ;
    this.modalService.titleModal = '';
    this.modalService.open();
  }

  public deleteColumn(): void{
    this.localStorageService.deleteColumn(this.task)
  }

  public deleteTask(task: ITask): void{
    this.localStorageService.deleteTask(task)
  }
}
