import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ModalService} from "../../services/modal.service";
import {ColumnService} from "../../services/column.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss']
})
export class AddColumnComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('',[
    ])
  })

  constructor(
    private taskService:TaskService,
    private modalService:ModalService,
    private columnService:ColumnService,
    private localStorageService:LocalStorageService,
  ) {}

  public ngOnInit(): void {
  }

  public submit(): void{
  }

  public createColumn(Task: any): void{
    if (Task.value.trim()){
      this.localStorageService.createColumn(Task.value);
      this.modalService.close();
    } else {
      Task.classList.add('column__error')
    }
  }

  public inputChange(Task: Element): void{
    Task.classList.remove('column__error')
  }
}
