import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Core Vimbo

@Injectable({
    providedIn: 'root'
})
export class OnVimboEditorService {
    onEditor: BehaviorSubject<any[]>;
    onEditorClose: BehaviorSubject<boolean>;
    onEditorSave: BehaviorSubject<
        {
            config: any;
            data: any;
        }[]
    >;

    constructor() {
        this.onEditor = new BehaviorSubject(null);
        this.onEditorClose = new BehaviorSubject(false);
        this.onEditorSave = new BehaviorSubject([]);
    }
}
