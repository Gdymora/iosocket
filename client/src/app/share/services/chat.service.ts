import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private socket: Socket) { }

    public sendMessage(message: string) {
      
        this.socket.emit('my message', message);
    }

    public getMessages = () => {
        return new Observable((observer: any) => {
            this.socket.on('new-message', (message: any, ) => {
                console.log(message)
                observer.next(message);
            });
        });
    }

}
