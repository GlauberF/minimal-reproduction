import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { VimboConfigService } from '@vimbo/services/config.service';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { VimboPerfectScrollbarDirective } from '@vimbo/directives/vimbo-perfect-scrollbar/vimbo-perfect-scrollbar.directive';
import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { VirtualDOMService } from '../../../../../../@vimbo/services/virtual-dom.service';

@Component({
    selector: 'navbar-vertical-style-2',
    templateUrl: './style-2.component.html',
    styleUrls: ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy {
    vimboConfig: any;
    navigation: any;

    // Private
    private _vimboPerfectScrollbar: VimboPerfectScrollbarDirective;
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboConfigService} _vimboConfigService
     * @param {VimboNavigationService} _vimboNavigationService
     * @param {VimboSidebarService} _vimboSidebarService
     * @param {Router} _router
     * @param _virtualDOMService
     */
    constructor(
        private _vimboConfigService: VimboConfigService,
        private _vimboNavigationService: VimboNavigationService,
        private _vimboSidebarService: VimboSidebarService,
        private _router: Router,
        private _virtualDOMService: VirtualDOMService
    ) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(VimboPerfectScrollbarDirective, { static: true })
    set directive(theDirective: VimboPerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._vimboPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._vimboNavigationService.onItemCollapseToggled
            .pipe(delay(500), takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                this._vimboPerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe(() => {
                this._virtualDOMService.windowRef().setTimeout(() => {
                    this._vimboPerfectScrollbar.scrollToElement(
                        'navbar .nav-link.active',
                        -120
                    );
                });
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe(() => {
                if (this._vimboSidebarService.getSidebar('navbar')) {
                    this._vimboSidebarService.getSidebar('navbar').close();
                }
            });

        // Get current navigation
        this._vimboNavigationService.onNavigationChanged
            .pipe(
                filter((value) => value !== null),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe(() => {
                this.navigation = this._vimboNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
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
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._vimboSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._vimboSidebarService.getSidebar('navbar').toggleFold();
    }
}
