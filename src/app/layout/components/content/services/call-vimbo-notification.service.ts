import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '@vimbo/components/notification/notification.model';

@Injectable({
    providedIn: 'root'
})
export class CallVimboNotificationService {
    onNotification: BehaviorSubject<NotificationModel[]>;

    constructor() {
        this.onNotification = new BehaviorSubject([new NotificationModel()]);
    }
}
