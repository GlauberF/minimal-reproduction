import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { VimboConfigService } from '@vimbo/services/config.service';

import { navigation } from '@nav/navigation';

@Component({
    selector: 'vertical-layout-1',
    templateUrl: './layout-1.component.html',
    styleUrls: ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy {
    vimboConfig: any;
    navigation: any;
    isMobile: any;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboConfigService} _vimboConfigService
     * @param deviceService
     */
    constructor(
        private _vimboConfigService: VimboConfigService,
        private deviceService: DeviceDetectorService
    ) {
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll$ = new Subject();

        this.isMobile = this.deviceService.isMobile();
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
}
