import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {IColumnTask} from "../../models/column-task.interface";
import {ModalService} from "../../services/modal.service";
import {ITask} from "../../models/task.interface";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() task!: IColumnTask

  public columnTasks = this.taskService.columnTasks

  constructor(
    private taskService: TaskService,
    public modalService: ModalService,
  ) {}

  ngOnInit(): void {
  }

  showModal(nowColumn: IColumnTask): void{
    this.taskService.nowColumnTask = nowColumn;
    this.modalService.titleModal = 'Добавить задачу';
    this.modalService.open();
  }

  showDetailTask(task: ITask): void{
    this.taskService.nowTask = task ;
    this.modalService.titleModal = '';
    this.modalService.open();
  }

  deleteColumn(): void{
    this.taskService.deleteColumn(this.task)
  }

  deleteTask(task: ITask){
    this.taskService.deleteTask(task)
  }
}
