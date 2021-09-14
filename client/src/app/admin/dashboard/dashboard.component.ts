import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/share/services/chat.service';
import { AlertService } from 'src/app/_alert';
export interface Message {
  login: string,
  msg: string,
  class: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  newMessage: string = '';
  messageList: Message[]=[];

  constructor(private alertService: AlertService, private chatService: ChatService) {
  }


  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message)
        this.messageList.push(message);
      });
  }
}
