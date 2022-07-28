import {IMessage} from "./message.interface";

export interface ITask{
  id:number,
  title: string,
  deadline: string,
  description: string,
  messages: IMessage[],
  condition: string
}
