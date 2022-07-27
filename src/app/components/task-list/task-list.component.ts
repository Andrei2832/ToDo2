import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ColumnTask} from "../../models/columnTask";
import {ModalService} from "../../services/modal.service";
import {DetailTaskComponent} from "../detail-task/detail-task.component";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() task!: ColumnTask

  columnTasks = this.taskService.columnTasks

  constructor(
    private taskService: TaskService,
    public modalService: ModalService,
    private detailTaskComponent:DetailTaskComponent
  ) {}

  ngOnInit(): void {
  }

  showModal(nowColumn: ColumnTask){
    this.taskService.nowColumnTask = nowColumn;
    this.modalService.titleModal = 'Добавить задачу';
    this.modalService.open();
  }

  showDetailTask(task: any){
    this.taskService.nowTask = task;
    this.modalService.titleModal = '';
    this.modalService.open();
  }
}
