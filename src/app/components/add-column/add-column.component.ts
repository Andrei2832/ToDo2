import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss']
})
export class AddColumnComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  constructor(
    public taskService:TaskService,
    public modalService:ModalService
  ) { }

  ngOnInit(): void {
  }

  submit(){
  }

  createColumn(textTask: string): void{
    if (textTask){
      this.taskService.createColumn(textTask);
      this.modalService.close();
    }
  }

}
