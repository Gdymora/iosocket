import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';
    /* https://stackblitz.com/edit/angular-8-alerts
    https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
     */
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }

    public alertResponse(response: any, id?: number) {
        let message;

        if (response['result'] == 'error') {
            if (typeof (response['msg']) == 'object') {
                Object.entries(response['msg']).forEach(([key, value]) => {
                    message = "№ " + id + "Better check yourself: " + key + ": " + value
                    this.alert(new Alert({ type: AlertType.Warning, message }));
                });
            } else {
                message = "№ " + id + "Better check yourself: " + response['msg']
                this.alert(new Alert({ type: AlertType.Warning, message }));
            }
        }



        if (response['result'] == 'success') {
            if (typeof (response['msg']) == 'object') {
                Object.entries(response['msg']).forEach(([key, value]) => {
                    message = "№ " + id + "Better check yourself: "
                        + response['msg'];
                    this.alert(new Alert({ type: AlertType.Success, message }));
                });
            } else {
                message = "№ " + id + "Better check yourself: "
                    + response['msg'];
                this.alert(new Alert({ type: AlertType.Success, message }));

            }
        }


    }

    public alertRegister(response: any, id?: number) {
        let message;
        message = response['message'];
        this.alert(new Alert({ type: AlertType.Success, message }));
    }
}