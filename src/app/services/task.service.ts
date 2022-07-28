import {Injectable} from '@angular/core';
import {ITask} from "../models/task.interface";
import {IColumnTask} from "../models/column-task.interface";
import {IMessage} from "../models/message.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public nowColumnTask: IColumnTask;
  public nowTask: ITask;
  public columnTasks: IColumnTask[] = this.getColumnTask();

  getColumnTask(): IColumnTask[]{
    let localTasks = JSON.parse(localStorage.getItem('columnTasks') as string);
    return localTasks == null ? [] : localTasks.columnTasks;
  }

  createFirstTask(titleFirstTask: string, deadline: string): void{
    this.columnTasks.push(this.createColumnTasks('Общие задачи',deadline, titleFirstTask ))
    this.columnTasks.push(this.createColumnTasks('В работе',deadline))
    this.columnTasks.push(this.createColumnTasks('Готово',deadline ))

    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  addTask(taskText: string, deadline: string): void{
    this.columnTasks.filter(item => {
      if (item.title === this.nowColumnTask.title){
        item.tasks.push(this.createTask(item.title,taskText,deadline))
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  addMessage(textMes: string): void{
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === this.nowTask){
          let newMes: IMessage = {
            text: textMes,
            date: new Date().toDateString()
          }
          task.messages.push(newMes)
        }
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  deleteMessage(message: IMessage): void{
    this.columnTasks.map(item => {
      item.tasks.map(task => {
        for (let mes of task.messages){
          if (mes === message){
            let index = task.messages.indexOf(mes)
            task.messages.splice(index,1)
          }
        }
      })
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  changeDescription(text:string): void{
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === this.nowTask){
          task.description = text.trim()
        }
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  createColumn(title: string): void{
    this.columnTasks.push(this.createColumnTasks(title));
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  deleteColumn(column: IColumnTask): void{
    let indexColumn = this.columnTasks.indexOf(column);
    this.columnTasks.splice(indexColumn,1);
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  createColumnTasks(titleColumn: string,deadline: string = '', titleTask: string = '' ): IColumnTask{
    return  <IColumnTask>{
      title: titleColumn,
      tasks: titleTask ? [this.createTask(titleColumn,titleTask, deadline)] : []
    }
  }

  deleteTask(taskDel: ITask): void{
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === taskDel){
          let index = item.tasks.indexOf(task)
          item.tasks.splice(index,1)
        }
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
    if (!this.columnTasks.map(item => item.tasks.length !== 0).includes(true)){
      localStorage.removeItem('columnTasks')
      this.columnTasks = this.getColumnTask();
    }
  }

  changeCondition(condition: string){
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === this.nowTask){
          let index = item.tasks.indexOf(task)
          item.tasks.splice(index,1)
        }
      }
    })
    this.nowTask.condition = condition
    this.columnTasks.map(item => {
      if (item.title == condition){
        item.tasks.push(this.nowTask)
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  createTask(condition: string, textTask: string, deadline: string): ITask{
    let id: number;
    if (!this.columnTasks.length){
      id = 0;
    }
    else if (!this.columnTasks.filter(item => item.title === condition)[0].tasks.length){
      id = 0
    }
    else {
      let tasks = this.columnTasks?.filter(item => item.title === condition)[0].tasks
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

  private static setLocalStorageTasks(columnTasks: IColumnTask[]): void {
    localStorage.setItem('columnTasks', JSON.stringify({columnTasks: columnTasks}));
  }
}
