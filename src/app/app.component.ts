import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

// Core Vimbo
import { VimboConfigService } from '@vimbo/services/config.service';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { VimboTranslationLoaderService } from '@vimbo/services/translation-loader.service';
import { VimboSplashScreenService } from '@vimbo/services/splash-screen.service';
import {
    LoggedUserInterface,
    StorageService
} from '@vimbo/services/storage.service';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { VimboMetaService } from '@vimbo/services/vimbo-meta.service';
import { RouterExtendService } from '@vimbo/services/router-extend.service';
import { SocketService } from '@vimbo/services/socket.service';
import { vimboCustomIconsSVG } from '@vimboConf/icons';

// Auxiliary files
import { navigation } from '@nav/navigation';

// Module
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationPortugues } from './i18n/pt_BR';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    vimboConfig: any;
    navigation: any;
    currentKeyNavigation: string;
    user: LoggedUserInterface;
    titleKeyboardShortcuts: string;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {VimboConfigService} _vimboConfigService
     * @param {VimboNavigationService} _vimboNavigationService
     * @param {VimboSidebarService} _vimboSidebarService
     * @param _vimboSplashScreenService
     * @param {VimboTranslationLoaderService} _vimboTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     * @param {SwUpdate} swUpdate
     * @param {StorageService} _storageService
     * @param {VirtualDOMService} _virtualDOMService
     * @param {VimboMetaService} meta
     * @param {MatIconRegistry} matIconRegistry
     * @param {DomSanitizer} domSanitizer
     * @param {RouterExtendService} _routerExtendService
     * @param {SocketService} _socketService
     * @param {DeviceDetectorService} _deviceService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _vimboConfigService: VimboConfigService,
        private _vimboNavigationService: VimboNavigationService,
        private _vimboSidebarService: VimboSidebarService,
        private _vimboSplashScreenService: VimboSplashScreenService,
        private _vimboTranslationLoaderService: VimboTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private swUpdate: SwUpdate,
        private _storageService: StorageService,
        private _virtualDOMService: VirtualDOMService,
        private meta: VimboMetaService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private _routerExtendService: RouterExtendService,
        private _socketService: SocketService,
        private _deviceService: DeviceDetectorService
    ) {
        // current navigation key reference
        this.currentKeyNavigation = '';

        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the services
        // this._vimboNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        // this._vimboNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'pt_BR']);

        // Set the default language
        this._translateService.setDefaultLang('pt_BR');

        // Set the navigation translations
        this._vimboTranslationLoaderService.loadTranslations(
            navigationEnglish,
            navigationPortugues
        );

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /*
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * services.

         * Set the default language to 'en' and then back to 'tr'.
         * '.use' cannot be used here as ngxTranslate won't switch to a language that's already
         * been selected and there is no way to force it, so we overcome the issue by switching
         * the default language back and forth.
         *
         * setTimeout(() => {
         *  this._translateService.setDefaultLang('en');
         *  this._translateService.setDefaultLang('tr');
         * });
         *
         **/

        // Use a language in Constructor
        this._virtualDOMService.windowRef().setTimeout(() => {
            this._translateService.use(this._storageService.get.language());
        });

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Add the browser and version as a class, with that we can make
        // specific treatments
        if (this._deviceService?.browser) {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            this.document.body.classList.add(
                this._deviceService?.browser?.toLocaleLowerCase()
            );
            if (this._deviceService?.browser_version) {
                this.document.body.classList.add(
                    `${this._deviceService?.browser?.toLocaleLowerCase()}-${
                        this._deviceService?.browser_version
                    }`
                );
            }
        }

        // Subscribe Router Title
        this.meta.subscribeRouterTitle();

        // Subscribe Router Extend Service
        this._routerExtendService.subscribeEvent();

        // Register icons
        for (const icon of vimboCustomIconsSVG) {
            this.matIconRegistry.addSvgIcon(
                icon.iconName,
                this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
            );
        }

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
        if (typeof window === 'undefined') {
            return;
        }

        // Use a language in NgOnInit
        this._virtualDOMService.windowRef().setTimeout(() => {
            this._translateService.use(this._storageService.get.language());
        }, 500);

        // Title Keyboard Shortcuts
        this.titleKeyboardShortcuts = this._translateService.instant(
            'KeyboardShortcuts.title'
        );

        // Subscribe to config changes
        this._vimboConfigService.config
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((config) => {
                this.vimboConfig = config;

                // Folded as per resolution
                if (
                    this._virtualDOMService.windowRef().screen.width < 1500 &&
                    !this._deviceService.isMobile() &&
                    !this._deviceService.isTablet()
                ) {
                    this.vimboConfig.layout.navbar.folded = true;
                }

                // Is folded, Storage
                if (
                    this._storageService.get.dynamic('VimboNavbarFolded', false)
                ) {
                    this.vimboConfig.layout.navbar.folded = this._vimboSidebarService.isFoldedByStorage(
                        'VimboNavbarFolded'
                    );
                }

                // Boxed
                if (this.vimboConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (const value of this.document.body.classList) {
                    const className = value;

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.vimboConfig.colorTheme);
            });

        // Subscribe to User change
        this._storageService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((user) => {
                if (user && user.length && user[0].data) {
                    if (this.currentKeyNavigation.length) {
                        // tslint:disable-next-line:prefer-const
                        let _currentId = this.currentKeyNavigation;
                        this._vimboNavigationService.unregister(_currentId);
                        this.currentKeyNavigation = `main-${user[0].data.emp_id}`;
                        // Register the navigation to the services
                        this._vimboNavigationService.register(
                            this.currentKeyNavigation,
                            this.navigation
                        );
                        // Set the main navigation as our current navigation
                        this._vimboNavigationService.setCurrentNavigation(
                            this.currentKeyNavigation
                        );
                    }

                    if (!this.currentKeyNavigation.length) {
                        this.currentKeyNavigation = `main-${user[0].data.emp_id}`;
                        // Register the navigation to the services
                        this._vimboNavigationService.register(
                            this.currentKeyNavigation,
                            this.navigation
                        );
                        // Set the main navigation as our current navigation
                        this._vimboNavigationService.setCurrentNavigation(
                            this.currentKeyNavigation
                        );
                    }

                    // Login Laravel Echo
                    if (this._socketService.connected) {
                        this._socketService.logout();
                    }
                    this._socketService.login();
                }
            });

        // Add class, if supported WebP
        this.supportsWebP().then((res) => {
            if (res) {
                this.document.body.classList.add('support-webp');
            } else {
                this.document.body.classList.remove('support-webp');
            }
        });

        // força atualizar se tiverr nova versão de cache
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe(() => {
                    if (typeof window !== 'undefined') {
                        window.location.reload();
                    }
                });
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._vimboSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Test Browser Supported WebP
     */
    supportsWebP(): Promise<unknown> {
        if (typeof window === 'undefined') {
            return new Promise((resolve): any => {
                return resolve(false);
            });
        }

        return new Promise((resolve) => {
            const image = new Image();
            image.onerror = () => {
                return resolve(false);
            };
            image.onload = () => {
                return resolve(image.width === 1);
            };
            image.src =
                'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
        }).catch(() => {
            return false;
        });
    }
}
