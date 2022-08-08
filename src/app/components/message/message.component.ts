import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from "../../models/message.interface";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() mess: IMessage;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  public ngOnInit(): void {
  }

  public deleteMessage(message: IMessage): void{
    this.localStorageService.deleteMessage(message);
  }
}
