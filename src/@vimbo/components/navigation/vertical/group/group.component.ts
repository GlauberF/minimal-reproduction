import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { _vimboNavigationItem } from '@vimbo/types';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { VimboUtils } from '@vimbo/utils';

@Component({
    selector: 'vimbo-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class VimboNavVerticalGroupComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: _vimboNavigationItem;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {VimboNavigationService} _vimboNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vimboNavigationService: VimboNavigationService
    ) {
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
        // Add new value for hidden through Destructuring
        this.item = {
            ...this.item,
            hidden: VimboUtils.returnsValueFromComplexVar(this.item.hidden)
        };

        // Subscribe to navigation item
        merge(
            this._vimboNavigationService.onNavigationItemAdded,
            this._vimboNavigationService.onNavigationItemUpdated,
            this._vimboNavigationService.onNavigationItemRemoved
        )
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
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
}
