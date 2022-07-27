import {Injectable} from '@angular/core';
import {Task} from "../models/task";
import {ColumnTask} from "../models/columnTask";
import {Message} from "../models/message";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  nowColumnTask: ColumnTask;
  nowTask: Task;
  columnTasks: ColumnTask[] = this.getColumnTask();

  getColumnTask(): ColumnTask[]{
    let localTasks = JSON.parse(localStorage.getItem('columnTasks') as string);
    return localTasks == null ? [] : localTasks.columnTasks;
  }

  createFirstTask(titleFirstTask: string, deadline: string){
    this.columnTasks.push(this.createColumnTasks('Общие задачи',deadline, titleFirstTask ))
    this.columnTasks.push(this.createColumnTasks('В работе',deadline))
    this.columnTasks.push(this.createColumnTasks('Готово',deadline ))

    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  addTask(taskText: string, deadline: string){
    this.columnTasks.filter(item => {
      if (item.title === this.nowColumnTask.title){
        item.tasks.push(this.createTask(item.title,taskText,deadline))
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  addMessage(textMes: string){
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === this.nowTask){
          let newMes: Message = {
            text: textMes,
            date: new Date().toDateString()
          }
          task.messages.push(newMes)
        }
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }

  deleteMessage(message: Message){
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

  changeDescription(text:string){
    this.columnTasks.map(item => {
      for (let task of item.tasks){
        if (task === this.nowTask){
          task.description = text.trim()
        }
      }
    })
    TaskService.setLocalStorageTasks(this.columnTasks);
  }



  createColumnTasks(titleColumn: string,deadline: string, titleTask: string = '' ): ColumnTask{
    return  <ColumnTask>{
      title: titleColumn,
      tasks: titleTask ? [this.createTask(titleColumn,titleTask, deadline)] : []
    }
  }

  createTask(condition: string, textTask: string, deadline: string): Task{
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


  private static setLocalStorageTasks(columnTasks: ColumnTask[]): void {
    localStorage.setItem('columnTasks', JSON.stringify({columnTasks: columnTasks}));
  }

  constructor() { }
}
