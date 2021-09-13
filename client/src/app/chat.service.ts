import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private socket: Socket) { }

    public sendMessage(message: string) {
        this.socket.emit('new-message', message);
    }

}