/*
 * Vimbo Progress Bar Component
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:36
 *
 * Example:
 * <vimbo-progress-bar></vimbo-progress-bar>
 */

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VimboProgressBarService } from '@vimbo/components/progress-bar/progress-bar.service';

@Component({
    selector: 'vimbo-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VimboProgressBarComponent implements OnInit, OnDestroy {
    bufferValue: number;
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
    visible: boolean;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboProgressBarService} _vimboProgressBarService
     */
    constructor(private _vimboProgressBarService: VimboProgressBarService) {
        // Set the defaults

        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the progress bar services properties

        // Buffer value
        this._vimboProgressBarService.bufferValue
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((bufferValue) => {
                this.bufferValue = bufferValue;
            });

        // Mode
        this._vimboProgressBarService.mode
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((mode) => {
                this.mode = mode;
            });

        // Value
        this._vimboProgressBarService.value
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((value) => {
                this.value = value;
            });

        // Visible
        this._vimboProgressBarService.visible
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((visible) => {
                this.visible = visible;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
