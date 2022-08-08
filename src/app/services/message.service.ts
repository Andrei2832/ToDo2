import { Injectable } from '@angular/core';
import {IMessage} from "../models/message.interface";
import {LocalStorageService} from "./local-storage.service";
import {IColumnTask} from "../models/column-task.interface";
import {ITask} from "../models/task.interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
  ) { }

  public addMessage(textMes: string, columnTasks: IColumnTask[], nowTask: ITask): IColumnTask[]{
    columnTasks.map(item => {
      for (let task of item.tasks){
        if (task.id === nowTask.id && task.condition === nowTask.condition){
          let newMes: IMessage = {
            text: textMes,
            date: new Date().toDateString()
          }
          task.messages.push(newMes)
        }
      }
    })
    return columnTasks
  }

  public deleteMessage(message: IMessage, columnTasks: IColumnTask[], nowTask: ITask): IColumnTask[]{
    columnTasks.map(item => {
      item.tasks.map(task => {
        for (let mes of task.messages){
          if (mes.date === message.date && mes.text === message.text && task.condition === nowTask.condition){
            let index = task.messages.indexOf(mes)
            task.messages.splice(index,1)
          }
        }
      })
    })
    return columnTasks
  }
}
