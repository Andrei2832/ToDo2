import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-creating-first-task',
  templateUrl: './creating-first-task.component.html',
  styleUrls: ['./creating-first-task.component.scss']
})
export class CreatingFirstTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
  }

  createFirstTask(task: string, deadline: string): void{
    if (task && deadline){
      this.taskService.createFirstTask(task, deadline)
      this.appComponent.update()
    }

  }
}
