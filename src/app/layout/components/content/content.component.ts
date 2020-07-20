import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationModel } from '@vimbo/components/notification/notification.model';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
// import { InterfaceUserEditGridList } from '@vimbo/components/user-edit-grid-list/user-edit-grid-list.type';
// import { EditorCodeModel } from '@vimbo/components/editor-code/editor-code.model';

import { CallVimboNotificationService } from './services/call-vimbo-notification.service';
import { OnVimboEditorService } from './services/on-vimbo-editor.service';
import { OnUserGridListService } from './services/on-user-grid-list.service';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit, OnDestroy {
    showNotificationVimbo: boolean;
    showCodeEditor: boolean;

    contentNotificationVimbo: NotificationModel;
    contentEditorVimbo: any;
    contentGridListUser: any;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _callVimboNotificationService: CallVimboNotificationService,
        private _onVimboEditorService: OnVimboEditorService,
        private _virtualDOMService: VirtualDOMService,
        private _onUserGridListService: OnUserGridListService
    ) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();

        this.showNotificationVimbo = false;
        this.showCodeEditor = false;
        this.contentNotificationVimbo = new NotificationModel();
        // this.contentEditorVimbo = null;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * Listens for all notifications to be shown
         */
        this._callVimboNotificationService.onNotification
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((res) => {
                if (res.length && res[0].message) {
                    this.contentNotificationVimbo = new NotificationModel(
                        res[0]
                    );
                    this.showNotificationVimbo = true;
                    // CLEAR BehaviorSubject
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this._callVimboNotificationService.onNotification.next([
                            new NotificationModel()
                        ]);
                    });
                }
            });

        /**
         * Listens for Editor Open
         */
        this._onVimboEditorService.onEditor
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((res) => {
                if (res && res.length && res[0].code) {
                    this.contentEditorVimbo = null;
                    this.showCodeEditor = true;
                    // CLEAR BehaviorSubject
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this._onVimboEditorService.onEditor.next([
                            null
                        ]);
                    });
                }
            });

        /**
         * Listens for user Grid List
         */
        this._onUserGridListService.onOpen
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((res) => {
                if (res && res.length) {
                    this.contentGridListUser = res;
                    // CLEAR BehaviorSubject
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this._onUserGridListService.onOpen.next(null);
                    });
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    /**
     * Function closed notification
     * @param event
     */
    listenComponentNotificationClosed(event): void {
        if (event) {
            this.showNotificationVimbo = false;
            this.contentNotificationVimbo = new NotificationModel();
        }
    }

    /**
     * Function closed Editor code
     * @param event
     */
    listenComponentEditorClosed(event): void {
        if (event) {
            this.showCodeEditor = false;
            this.contentEditorVimbo = null;
            this._onVimboEditorService.onEditorClose.next(true);
        }
    }

    /**
     * Notify specific listeners through the slug and send the data
     * @param config
     * @param data
     */
    listenComponentEditorSave(config, data): void {
        if (config && data) {
            this._onVimboEditorService.onEditorSave.next([
                {
                    config,
                    data
                }
            ]);
            // Clear observable after 300ms
            this._virtualDOMService.windowRef().setTimeout(() => {
                this._onVimboEditorService.onEditorSave.next([]);
            }, 300);
        }
    }

    /**
     * Function closed wizard grid list
     * @param event
     */
    listenComponentUserGridListClosed(event): void {
        if (event) {
            this.contentGridListUser = null;
            this._onUserGridListService.onClose.next(true);
        }
    }

    /**
     * Send/Notify data of Wizard Grid List
     * sending the settings containing the slug
     * @param config
     * @param data
     */
    listenComponentUserGridListSave(config, data): void {
        console.log('listenComponentUserGridListSave', data);
        console.log(
            'listenComponentUserGridListSave',
            JSON.parse(data[0].data)
        );
        if (config && data) {
            this._onUserGridListService.onSave.next([
                {
                    config,
                    data
                }
            ]);
            // Clear observable after 300ms
            this._virtualDOMService.windowRef().setTimeout(() => {
                this._onUserGridListService.onSave.next([]);
            }, 300);
        }
    }
}
