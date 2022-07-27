import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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
