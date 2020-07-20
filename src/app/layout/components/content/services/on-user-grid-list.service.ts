import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class OnUserGridListService {
    onOpen: BehaviorSubject<any[]>;
    onClose: BehaviorSubject<boolean>;
    onSave: BehaviorSubject<
        {
            config: any;
            data: any;
        }[]
    >;

    constructor() {
        this.onOpen = new BehaviorSubject(null);
        this.onClose = new BehaviorSubject(false);
        this.onSave = new BehaviorSubject(null);
    }
}
