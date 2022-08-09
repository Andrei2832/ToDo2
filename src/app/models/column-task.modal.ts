import {IColumnTask} from "./column-task.interface";

export class ColumnTaskModal{
  private _column: IColumnTask[];

  constructor(column: IColumnTask[]) {
    this.column = column
  }

  public get column(): IColumnTask[]{
    return this._column;
  }

  public set column(value: IColumnTask[]){
    this._column = value;
  }
}
