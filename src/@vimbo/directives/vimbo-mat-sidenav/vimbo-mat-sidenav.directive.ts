import {
    Directive,
    Input,
    OnInit,
    HostListener,
    OnDestroy,
    HostBinding
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VimboMatchMediaService } from '@vimbo/services/match-media.service';
import { VimboMatSidenavHelperService } from '@vimbo/directives/vimbo-mat-sidenav/vimbo-mat-sidenav.service';

@Directive({
    selector: '[vimboMatSidenavHelper]'
})
export class VimboMatSidenavHelperDirective implements OnInit, OnDestroy {
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input()
    vimboMatSidenavHelper: string;

    @Input()
    matIsLockedOpen: string;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboMatchMediaService} _vimboMatchMediaService
     * @param {VimboMatSidenavHelperService} _vimboMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _vimboMatchMediaService: VimboMatchMediaService,
        private _vimboMatSidenavHelperService: VimboMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _mediaObserver: MediaObserver
    ) {
        // Set the defaults
        this.isLockedOpen = true;

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
        // Register the sidenav to the services
        this._vimboMatSidenavHelperService.setSidenav(
            this.vimboMatSidenavHelper,
            this._matSidenav
        );

        if (
            this.matIsLockedOpen &&
            this._mediaObserver.isActive(this.matIsLockedOpen)
        ) {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        } else {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._vimboMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                if (
                    this.matIsLockedOpen &&
                    this._mediaObserver.isActive(this.matIsLockedOpen)
                ) {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                } else {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
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
}

@Directive({
    selector: '[vimboMatSidenavToggler]'
})
export class VimboMatSidenavTogglerDirective {
    @Input()
    vimboMatSidenavToggler: string;

    /**
     * Constructor
     *
     * @param {VimboMatSidenavHelperService} _vimboMatSidenavHelperService
     */
    constructor(
        private _vimboMatSidenavHelperService: VimboMatSidenavHelperService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void {
        this._vimboMatSidenavHelperService
            .getSidenav(this.vimboMatSidenavToggler)
            .toggle();
    }
}
