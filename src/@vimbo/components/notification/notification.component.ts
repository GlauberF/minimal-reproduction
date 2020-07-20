/*
 * Vimbo Notification Component
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:33
 *
 * Example:
 * <vimbo-notification></vimbo-notification>
 */

import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { NotificationModel } from './notification.model';

@Component({
    selector: 'vimbo-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VimboNotificationComponent implements OnInit, OnDestroy {
    background: string;
    color: string;
    autoCloseTime: any;
    visiblityState: string;

    @Input()
    message: NotificationModel['message'];

    @Input()
    status: NotificationModel['status'];

    @Input('showButtonConfirm')
    showButtonConfirm: NotificationModel['showButtonConfirm'];

    @Input('timeToClose')
    timeToClose: NotificationModel['timeToClose'];

    @Input()
    textButton: NotificationModel['textButton'];

    @Input()
    buttonType: NotificationModel['buttonType'];

    @Input()
    autoClose: NotificationModel['autoClose'];

    @Input()
    hiddenClose: NotificationModel['hiddenClose'];

    // emite evento para fechar
    @Output()
    emitEventOnClose: EventEmitter<boolean>;

    // emite evento para fechar
    @Output()
    emitEventOnConfirm: EventEmitter<boolean>;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     */
    constructor(private _virtualDOMService: VirtualDOMService) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();

        this.emitEventOnClose = new EventEmitter();
        this.emitEventOnConfirm = new EventEmitter();

        // this.visiblityState = 'shown';
        this.visiblityState = 'fadeInUp';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * conforme o status a cor e time
         */
        switch (this.status) {
            case 'info':
                this.background = '#31b0d5';
                this.color = '#fff';
                this.autoCloseTime = this.timeToClose || 10000;
                break;
            case 'warning':
                this.background = '#ffdd57';
                this.color = 'rgba(0,0,0,.7)';
                this.autoCloseTime = this.timeToClose || 10000;
                break;
            case 'warningLight':
                this.background = '#fff3cd';
                this.color = '#856404';
                this.autoCloseTime = this.timeToClose || 10000;
                break;
            case 'danger':
                this.background = '#ff3860';
                this.color = '#fff';
                this.autoCloseTime = this.timeToClose || 10000;
                break;
            case 'ads':
                this.background = '#fff';
                this.color = '#000000';
                this.autoCloseTime = this.timeToClose || 15000;
                break;
            case 'success':
                this.background = '#23d160';
                this.color = '#fff';
                this.autoCloseTime = this.timeToClose || 10000;
                break;
            default:
                // this.background = '#57d59f'
                this.background = '#23d160';
                this.color = '#fff';
                this.autoCloseTime = this.timeToClose || 5000;
        }

        /**
         * se autoClose for true/informado, ele fechara com base no tempo do status
         */
        if (this.autoClose) {
            this._virtualDOMService.windowRef().setTimeout(() => {
                this.visiblityState = 'fadeOutDown';

                this._virtualDOMService.windowRef().setTimeout(() => {
                    this.emitEventOnClose.emit(true);
                }, 500);
            }, this.autoCloseTime);
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods (_method)
    // -----------------------------------------------------------------------------------------------------

    /**
     * User clicked on confirm
     */
    confirm(): void {
        this.close();
    }

    /**
     * User clicked on close
     */
    close(): void {
        // this.visiblityState = 'hidden';
        this.visiblityState = 'fadeOutDown';

        this._virtualDOMService.windowRef().setTimeout(() => {
            this.emitEventOnClose.emit(true);
        }, 500);
    }
}
