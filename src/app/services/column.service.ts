import { Injectable } from '@angular/core';
import {TaskService} from "./task.service";
import {IColumnTask} from "../models/column-task.interface";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(
    private taskService: TaskService,
  ) { }

  public createColumn(title: string, columnTask: IColumnTask[]): IColumnTask{
    return this.createColumnTasks(title, columnTask);
  }

  public createColumnTasks(titleColumn: string, columnTask: IColumnTask[], deadline: string = '', titleTask: string = '' ): IColumnTask{
    return  <IColumnTask>{
      title: titleColumn,
      tasks: titleTask ? [this.taskService.createTask(titleColumn,titleTask, deadline, columnTask)] : []
    }
  }


}
