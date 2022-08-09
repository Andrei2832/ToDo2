import {ITask} from "./task.interface";

export class TaskModal{
  private _task: ITask = <ITask>{}

  constructor(task: ITask) {
    this.task = task;
  }

  public get task(): ITask{
    return this._task;
  }

  public set task(value: ITask){
    this._task = value;
  }
}
