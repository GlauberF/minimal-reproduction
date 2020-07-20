import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { navigation } from '@nav/navigation';
import { StorageService } from '../../services/storage.service';
import { VirtualDOMService } from '../../services/virtual-dom.service';

@Component({
    selector: 'vimbo-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VimboNavigationComponent implements OnInit, OnDestroy {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {VimboNavigationService} _vimboNavigationService
     * @param _storageService
     * @param _virtualDOMService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vimboNavigationService: VimboNavigationService,
        private _storageService: StorageService,
        private _virtualDOMService: VirtualDOMService
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
        // Load the navigation either from the input or from the services
        this.navigation =
            cloneDeep(this.navigation) ||
            this._vimboNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._vimboNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                // Load the navigation
                this.navigation = this._vimboNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

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

        // Subscribe to navigation Unregistered
        this._vimboNavigationService.onNavigationUnregistered
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                console.warn('[Navigation Unregistered]');
                this.navigation = [];
                // this._changeDetectorRef.detectChanges();
            });

        // Subscribe to navigation Registered
        this._vimboNavigationService.onNavigationRegistered
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                this._virtualDOMService.windowRef().setTimeout(() => {
                    console.warn('[Navigation Registered]');
                    this.navigation = [...cloneDeep(navigation)];
                    this._changeDetectorRef.markForCheck();
                }, 1000);
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
