import { Injectable } from '@angular/core';
import {IColumnTask} from "../models/column-task.interface";
import {ITask} from "../models/task.interface";
import {ColumnService} from "./column.service";
import {TaskService} from "./task.service";
import {MessageService} from "./message.service";
import {IMessage} from "../models/message.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public nowColumnTask: IColumnTask;
  public nowTask: ITask;
  public columnTasks = new BehaviorSubject<IColumnTask[]>(this.getLocalStorage())

  constructor(
    private columnService: ColumnService,
    private taskService: TaskService,
    private messageService: MessageService,
  ) {}


  public getLocalStorage(): IColumnTask[]{
    let localTasks = JSON.parse(localStorage.getItem('columnTasks') as string);
    return localTasks === null ? [] : localTasks.columnTasks;
  }

  public setLocalStorage(columnTasks: IColumnTask[]): void {
    localStorage.setItem('columnTasks', JSON.stringify({columnTasks: columnTasks}));
  }

  public updateData(): void{
    this.setLocalStorage(this.columnTasks.value);
    this.columnTasks.next(this.getLocalStorage());
  }

  public createFirstTask(titleFirstTask: string, deadline: string): void{
    this.columnTasks.value.push(this.columnService.createColumnTasks('Общие задачи', this.columnTasks.value, deadline, titleFirstTask ))
    this.columnTasks.value.push(this.columnService.createColumnTasks('В работе', this.columnTasks.value, deadline))
    this.columnTasks.value.push(this.columnService.createColumnTasks('Готово', this.columnTasks.value, deadline ))

    this.updateData()
  }

  public createColumn(textTask: string): void{
    this.columnTasks.value.push(this.columnService.createColumn(textTask, this.columnTasks.value))
    this.updateData()
  }

  public addTask(taskText: string, deadline: string): void{
    this.columnTasks.next(this.taskService.addTask(taskText,deadline,this.columnTasks.value, this.nowColumnTask))
    this.updateData()
  }

  public changeDescription(text:string): void{
    this.columnTasks.next(this.taskService.changeDescription(text, this.columnTasks.value, this.nowTask))
    this.updateData()
  }

  public deleteColumn(column: IColumnTask): void{
    this.columnTasks.next(this.taskService.deleteColumn(column, this.columnTasks.value))
    this.updateData()
  }

  public deleteTask(taskDel: ITask): void{
    this.columnTasks.next(this.taskService.deleteTask(taskDel, this.columnTasks.value))
    this.updateData()

    if (!this.columnTasks.value.map(item => item.tasks.length !== 0).includes(true)){
      localStorage.removeItem('columnTasks')
      this.columnTasks.next(this.getLocalStorage());
    }
  }

  public addMessage(textMes: string): void{
    this.columnTasks.next(this.messageService.addMessage(textMes, this.columnTasks.value, this.nowTask))
    this.updateData()
  }

  public deleteMessage(message: IMessage): void{
    this.columnTasks.next(this.messageService.deleteMessage(message, this.columnTasks.value, this.nowTask))
    this.updateData()
  }
  public changeCondition(condition: string): void{
    this.columnTasks.next(this.taskService.changeCondition(condition, this.columnTasks.value, this.nowTask))
    this.updateData()
  }
}
