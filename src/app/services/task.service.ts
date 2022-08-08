import {Injectable} from '@angular/core';
import {ITask} from "../models/task.interface";
import {IColumnTask} from "../models/column-task.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
  ) { }

  public addTask(taskText: string, deadline: string, columnTasks: IColumnTask[], nowColumnTask: IColumnTask): IColumnTask[]{
    columnTasks.filter(item => {
      if (item.title === nowColumnTask.title){
        item.tasks.push(this.createTask(item.title,taskText,deadline, columnTasks))
      }
    })
    return columnTasks
  }

  public changeDescription(text: string, columnTasks: IColumnTask[], nowTask: ITask): IColumnTask[]{
    columnTasks.map(item => {
      for (let task of item.tasks){
        if (task.id === nowTask.id && task.condition === nowTask.condition){
          task.description = text.trim()
        }
      }
    })
    return columnTasks
  }

  public deleteColumn(column: IColumnTask, columnTasks: IColumnTask[]): IColumnTask[]{
    let indexColumn = columnTasks.indexOf(column);
    columnTasks.splice(indexColumn,1);
    return columnTasks
  }

  public deleteTask(taskDel: ITask,columnTasks: IColumnTask[]): IColumnTask[]{
    columnTasks.map(item => {
      for (let task of item.tasks){
        if (task.id === taskDel.id && task.condition === taskDel.condition){
          let index = item.tasks.indexOf(task)
          item.tasks.splice(index,1)
        }
      }
    })
    return columnTasks
  }

  public changeCondition(condition: string, columnTasks: IColumnTask[], nowTask: ITask): IColumnTask[]{
    columnTasks.map(item => {
      for (let task of item.tasks){
        if (task.id === nowTask.id && task.condition === nowTask.condition){
          let index = item.tasks.indexOf(task)
          item.tasks.splice(index,1)
        }
      }
    })
    nowTask.condition = condition
    columnTasks.map(item => {
      if (item.title == condition){
        item.tasks.push(nowTask)
      }
    })
    return columnTasks
  }

  public createTask(condition: string, textTask: string, deadline: string, columnTasks: IColumnTask[]): ITask{
    let id: number;
    if (!columnTasks.length){
      id = 0;
    }
    else if (!columnTasks.filter(item => item.title === condition)[0].tasks.length){
      id = 0
    }
    else {
      let tasks = columnTasks?.filter(item => item.title === condition)[0].tasks
      id = tasks[tasks.length - 1].id + 1
    }

    return {
      id: id,
      title: textTask,
      deadline: deadline,
      description: '',
      messages: [],
      condition: condition
    }
  }
}
