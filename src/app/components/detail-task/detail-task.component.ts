import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IMessage} from "../../models/message.interface";
import {ModalService} from "../../services/modal.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {

  public task = this.localStorageService.nowTask;
  public mess = new BehaviorSubject<IMessage[]>(this.localStorageService.nowTask.messages)

  constructor(
    private modalService: ModalService,
    private localStorageService:LocalStorageService,
  ) {}

  public ngOnInit(): void {
  }

  public columnTasks = this.localStorageService.columnTasks

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  public submit(): void{
  }

  public changeDescription(text: string): void{
    if (text.trim()){
      this.localStorageService.changeDescription(text)
    }
  }

  public addMessage(textMes: string): void{
    if (textMes.trim()){
      this.localStorageService.addMessage(textMes);
    }
  }

  public changeCondition(condition: string): void{
    this.localStorageService.changeCondition(condition)
    this.modalService.close()
  }
}
