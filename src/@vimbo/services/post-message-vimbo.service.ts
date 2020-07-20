import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PostMessageVimboService {
    constructor() {}

    send(args): any {
        if (typeof window !== 'undefined' && args) {
            return window.parent.postMessage(JSON.stringify(args), '*');
        }
    }
}
