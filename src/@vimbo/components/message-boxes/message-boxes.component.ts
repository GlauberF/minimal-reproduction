/*
 * Vimbo Message Boxes Component
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:32
 *
 * Example:
 * <vimbo-message-boxes></vimbo-message-boxes>
 */

import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

export enum enumTypesMessageBoxes {
    'primary',
    'link',
    'info',
    'infoLight',
    'success',
    'warning',
    'danger',
    'textOnly',
    'textOnlySuccess',
    'textOnlyInfo',
    'textOnlyLink',
    'textOnlyWarning',
    'textOnlyDanger'
}

@Component({
    selector: 'vimbo-message-boxes',
    templateUrl: './message-boxes.component.html',
    styleUrls: ['./message-boxes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VimboMessageBoxesComponent implements OnInit, OnDestroy {
    @Input('type')
    type: keyof typeof enumTypesMessageBoxes;

    @Input('message')
    message: string | any;

    @Input('hideButtonClose')
    hideButtonClose: boolean;

    @Input('url')
    url: string;

    @HostBinding('class.is-primary')
    public get isPrimary(): boolean {
        return this.type === 'primary';
    }

    @HostBinding('class.is-link')
    public get isLink(): boolean {
        return this.type === 'link';
    }

    @HostBinding('class.is-info')
    public get isInfo(): boolean {
        return this.type === 'info';
    }

    @HostBinding('class.is-info-light')
    public get isInfoLight(): boolean {
        return this.type === 'infoLight';
    }

    @HostBinding('class.is-success')
    public get isSuccess(): boolean {
        return this.type === 'success';
    }

    @HostBinding('class.is-warning')
    public get isWarning(): boolean {
        return this.type === 'warning';
    }

    @HostBinding('class.is-danger')
    public get isDanger(): boolean {
        return this.type === 'danger';
    }

    @HostBinding('class.text-only')
    public get isTextOnly(): boolean {
        return this.type === 'textOnly';
    }

    @HostBinding('class.text-only-success')
    public get isTextOnlySuccess(): boolean {
        return this.type === 'textOnlySuccess';
    }

    @HostBinding('class.text-only-info')
    public get isTextOnlyInfo(): boolean {
        return this.type === 'textOnlyInfo';
    }

    @HostBinding('class.text-only-link')
    public get isTextOnlyLink(): boolean {
        return this.type === 'textOnlyLink';
    }

    @HostBinding('class.text-only-warning')
    public get isTextOnlyWarning(): boolean {
        return this.type === 'textOnlyWarning';
    }

    @HostBinding('class.text-only-danger')
    public get isTextOnlyDanger(): boolean {
        return this.type === 'textOnlyDanger';
    }

    @Output()
    outputClose: EventEmitter<any>;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.outputClose = new EventEmitter();

        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    close(): void {
        this.outputClose.emit(true);
    }
}
