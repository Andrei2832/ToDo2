import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  constructor(
    private modalService:ModalService,
    private localStorageService:LocalStorageService,
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void{
  }

  public createTask(textTask: any, deadline: any): void{
    if (textTask.value.trim() && deadline.value.trim()){
      this.localStorageService.addTask(textTask.value,deadline.value);
      this.modalService.close();
    }
    if (!textTask.value.trim()){
      textTask.classList.add('error')
    }
    if(!deadline.value.trim()){
      deadline.classList.add('error')
    }
  }

  public inputChange(Task: Element): void{
    Task.classList.remove('error')
  }
}
