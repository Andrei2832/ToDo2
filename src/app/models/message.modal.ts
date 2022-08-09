import {IMessage} from "./message.interface";

export class MessageModal{
  private _message: IMessage[] = []

  constructor(message: IMessage[]) {
    this.message = message
  }

  public get message(): IMessage[]{
    return this._message;
  }

  public set message(value: IMessage[]){
    this._message = value;
  }
}
