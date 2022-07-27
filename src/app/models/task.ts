import {Message} from "./message";

export interface Task{
  id:number,
  title: string,
  deadline: string,
  description: string,
  messages: Message[],
  condition: string
}
