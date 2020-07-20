/*
 * Vimbo Search Bar Component
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:36
 *
 * Example:
 * <vimbo-search-bar (inputSearch)=""></vimbo-search-bar>
 */

import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VimboConfigService } from '@vimbo/services/config.service';

@Component({
    selector: 'vimbo-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class VimboSearchBarComponent implements OnInit, OnDestroy {
    collapsed: boolean;
    vimboConfig: any;

    @Output()
    inputSearch: EventEmitter<any>;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboConfigService} _vimboConfigService
     */
    constructor(private _vimboConfigService: VimboConfigService) {
        // Set the defaults
        this.inputSearch = new EventEmitter();
        this.collapsed = true;

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
        // Subscribe to config changes
        this._vimboConfigService.config
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((config) => {
                this.vimboConfig = config;
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

    /**
     * Collapse
     */
    collapse(): void {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void {
        this.inputSearch.emit(event.target.value);
    }
}
