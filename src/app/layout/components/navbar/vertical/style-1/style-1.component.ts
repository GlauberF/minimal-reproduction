import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

// Core Vimbo
import { VimboConfigService } from '@vimbo/services/config.service';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { VimboPerfectScrollbarDirective } from '@vimbo/directives/vimbo-perfect-scrollbar/vimbo-perfect-scrollbar.directive';
import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { EncryptDecryptRc4Service } from '@vimbo/services/encrypt-decrypt-rc4.service';
import { VimboTranslationLoaderService } from '@vimbo/services/translation-loader.service';
import {
    LoggedUserInterface,
    StorageService
} from '@vimbo/services/storage.service';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { SocketService } from '@vimbo/services/socket.service';
import { NotificationModel } from '@vimbo/components/notification/notification.model';
import { UtilsService } from '@vimbo/services/utils.service';

// Auxiliary files
import { CallVimboNotificationService } from '@layoutComponent/content/services/call-vimbo-notification.service';

// Component
import { locale as localeEnglish } from './i18n/en';
import { locale as localePortugues } from './i18n/pt_BR';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    vimboConfig: any;
    navigation: any;
    user: LoggedUserInterface;
    folded: boolean;
    counterLogout: string;
    canEditProfile: boolean;

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
     * @param {EncryptDecryptRc4Service} _EncryptDecryptRc4Service
     * @param {StorageService} _storageService
     * @param {VirtualDOMService} _virtualDOMService
     * @param {SocketService} _socketService
     * @param {CallVimboNotificationService} _callVimboNotificationService
     * @param {TranslateService} _translateService
     * @param {VimboTranslationLoaderService} _vimboTranslationLoaderService
     * @param {UtilsService} _utilsService
     */
    constructor(
        private _vimboConfigService: VimboConfigService,
        private _vimboNavigationService: VimboNavigationService,
        private _vimboSidebarService: VimboSidebarService,
        private _router: Router,
        private _EncryptDecryptRc4Service: EncryptDecryptRc4Service,
        private _storageService: StorageService,
        private _virtualDOMService: VirtualDOMService,
        private _socketService: SocketService,
        private _callVimboNotificationService: CallVimboNotificationService,
        private _translateService: TranslateService,
        private _vimboTranslationLoaderService: VimboTranslationLoaderService,
        private _utilsService: UtilsService,
    ) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
        // Set translations
        this._vimboTranslationLoaderService.loadTranslations(
            localeEnglish,
            localePortugues
        );
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
        this.counterLogout = null;
        this.canEditProfile = true;
        this.user = this._storageService.get.user();

        if (!this._socketService.connect) {
            this._socketService.login();
        }

        // Listen Channel logout user
        this._socketService.connect
            .join(`logout-user-${this.user ? this.user.id : 0}`, 'private')
            .listen(
                `logout-user-${this.user ? this.user.id : 0}`,
                'LogoutUserNotification'
            )
            .pipe(
                tap((arg) => {
                    const attentionMessage = (time = null) => {
                        return `
                            <p></p><b>${this._translateService.instant(
                                'Atenção!'
                            )}</b></p>
                            <p>
                                ${this._translateService.instant(
                                    'Dentro de 20 segundos você será deslogado do sistema'
                                )}
                                <span>${time ? ' - ' : ''}</span>
                                <span class="ml-4 ${
                                    time
                                        ? 'badge vimbo-white-bg vimbo-black-fg'
                                        : ''
                                }">${time ? time : ''}</span>
                            </p>
                        `;
                    };

                    // init
                    if (!this.counterLogout) {
                        this._callVimboNotificationService.onNotification.next([
                            {
                                message: attentionMessage(),
                                status: 'info',
                                timeToClose: 19500,
                                autoClose: true
                            }
                        ]);
                    }

                    // append counter in to message
                    this._utilsService
                        .simpleAnimatedCounterService(0, 20, '-', 900)
                        .pipe(takeUntil(this._unsubscribeAll$))
                        .subscribe((value) => {
                            // transforms it into a string, keeps the
                            // reference of the value and keeps at least
                            // two characters
                            this.counterLogout =
                                String(value).length === 1
                                    ? `0${value}`
                                    : String(value);
                            this._callVimboNotificationService.onNotification.next(
                                [
                                    {
                                        message: attentionMessage(
                                            this.counterLogout
                                        ),
                                        status: 'info',
                                        timeToClose: 19500,
                                        autoClose: true
                                    }
                                ]
                            );
                        });
                }),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe((res) => {
                // console.log('----- logout-user -----', res);
                this._virtualDOMService.windowRef().setTimeout((t) => {
                    // call logout
                    this.logout();
                    // Message
                    this._callVimboNotificationService.onNotification.next([
                        {
                            message: `
                            <b>${this._translateService.instant(
                                'Restrições de acesso!'
                            )}</b><br>
                            <p>${this._translateService.instant(
                                'Ops, você foi deslogado do sistema por que possui uma das restrição abaixo:',
                                { name: this.user.nome }
                            )}
                            </p>
                            <p class="text-left"><ul class="text-left">
                                <li>${this._translateService.instant(
                                    'Restrição de acesso por Horário'
                                )}</li>
                                <li>${this._translateService.instant(
                                    'Restrição de acesso por Dia'
                                )}</li>
                                <li>${this._translateService.instant(
                                    'Restrição de acesso por IP'
                                )}</li>
                            </ul></p>
                        `,
                            status: 'info',
                            timeToClose: 15000,
                            autoClose: true
                        }
                    ]);
                }, 21000);
            });

        this.folded = this._vimboSidebarService.isFoldedByStorage(
            'VimboNavbarFolded'
        );

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

        // Subscribe to the config changes
        this._vimboConfigService.config
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((config) => {
                this.vimboConfig = config;
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

        // On User Changed
        this._storageService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((user) => {
                if (user && user.length && user[0].data) {
                    this.user = user[0].data as LoggedUserInterface;

                    // Enables or Disables the edit profile button
                    // this.canEditProfile = this._profileService.checkCanEditProfile(
                    //     user[0].data as LoggedUserInterface
                    // );
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit Profile
     * @param path
     */
    editProfile(path: string): void {
        this._router.navigate([path]);
    }

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._vimboSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Logout
     * @param notification
     */
    logout(notification?: NotificationModel): void {
        if (typeof window === 'undefined') {
            return;
        }

        // logout socket (laravel echo)
        this._socketService.logout();

        this._storageService.del.all('user');
        this._router
            .navigate(['/pages/auth/login'])
            .then(() => {
                // Send Notification to user ?
                if (notification) {
                    this._callVimboNotificationService.onNotification.next([
                        { ...notification }
                    ]);
                    // CLEAR BehaviorSubject
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this._callVimboNotificationService.onNotification.next([
                            new NotificationModel()
                        ]);
                    });
                }
            })
            .catch((er) => console.log(er));
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        // Toggle
        this._vimboSidebarService.getSidebar('navbar').toggleFold();

        // set storage
        this.folded = this._vimboSidebarService.getSidebar('navbar').folded;
        this._storageService.set.dynamic(
            'VimboNavbarFolded',
            JSON.stringify(this.folded),
            false,
            false,
            'user'
        );
    }
}
