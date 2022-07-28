import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public titleModal: string = 'Добавить задачу'

  public isVisible$ = new BehaviorSubject<boolean>(false)

  open(): void{
    this.isVisible$.next(true)
  }
  close(): void{
    this.isVisible$.next(false)
  }
}
