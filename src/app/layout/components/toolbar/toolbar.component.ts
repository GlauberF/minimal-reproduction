import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

// Core Vimbo
import { VimboConfigService } from '@vimbo/services/config.service';
import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { VimboElectronService } from '@vimbo/services/electron.service';
import { StorageService } from '@vimbo/services/storage.service';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { ChangeAccountService } from '@vimbo/services/change-account.service';
import { VimboProgressBarService } from '@vimbo/components/progress-bar/progress-bar.service';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { VimboConfirmDialogComponent } from '@vimbo/components/confirm-dialog/confirm-dialog.component';
import { SortPipe } from '@vimbo/pipes/sort.pipe';

// Auxiliary files
import { navigation } from '@nav/navigation';
import { CallVimboNotificationService } from '../content/services/call-vimbo-notification.service';

export interface MultiConta {
    _id: string;
    emp_nome: string;
}

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
    confirmDialogRef: MatDialogRef<VimboConfirmDialogComponent>;
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    userStatusOptions: any[];
    isMobile: boolean;
    isThemeLight = true;
    isElectron: boolean;
    keyDowns: any;
    keyUps: any;
    draggable: string;
    user: any;
    newObjectMultiAccountCompanies: MultiConta;
    multiAccountCompanies: [MultiConta];
    currentCompanyMultiAccount: MultiConta;
    truncateLength: string;
    folded: boolean;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboConfigService} _vimboConfigService
     * @param {VimboSidebarService} _vimboSidebarService
     * @param {VimboNavigationService} _vimboNavigationService
     * @param {DeviceDetectorService} deviceService
     * @param {VimboElectronService} _vimboelectronService
     * @param {StorageService} _storageService
     * @param {ChangeAccountService} _changeAccountService
     * @param {CallVimboNotificationService} _callVimboNotificationService
     * @param {VimboProgressBarService} _vimboProgressBarService
     * @param {VirtualDOMService} _virtualDOMService
     * @param {MatDialog} _matDialog
     * @param {SortPipe} _sortPipe
     */
    constructor(
        private _vimboConfigService: VimboConfigService,
        private _vimboSidebarService: VimboSidebarService,
        private _vimboNavigationService: VimboNavigationService,
        private deviceService: DeviceDetectorService,
        private _vimboelectronService: VimboElectronService,
        private _storageService: StorageService,
        private _changeAccountService: ChangeAccountService,
        private _callVimboNotificationService: CallVimboNotificationService,
        private _vimboProgressBarService: VimboProgressBarService,
        private _virtualDOMService: VirtualDOMService,
        private _matDialog: MatDialog,
        private _sortPipe: SortPipe
    ) {
        // Set the defaults

        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            }
        ];

        this.navigation = navigation;

        this.isMobile = this.deviceService.isMobile();

        this.truncateLength = this.isMobile ? '11' : '50';

        // Set the private defaults
        this._unsubscribeAll$ = new Subject();

        // create object company empty
        this.newObjectMultiAccountCompanies = {
            _id: null,
            emp_nome: null
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.folded = this._vimboSidebarService.isFoldedByStorage(
            'VimboNavbarFolded'
        );

        // Subscribe to the config changes
        this._vimboConfigService.config
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((settings) => {
                this.horizontalNavbar =
                    settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // verifica se tem foi clicado no modo
        this.isThemeLight =
            typeof window !== 'undefined' &&
            window.localStorage.getItem('modoLightPWAVimbo')
                ? JSON.parse(window.localStorage.getItem('modoLightPWAVimbo'))
                : true;

        /**
         * Disabled F11
         */
        this.keyDowns =
            typeof window !== 'undefined'
                ? fromEvent(document, 'keydown')
                      .pipe(takeUntil(this._unsubscribeAll$))
                      .subscribe((ev: any) => {
                          if (ev.keyCode === 122 || ev.which === 122) {
                              ev.preventDefault();
                          }
                      })
                : null;

        this.keyUps =
            typeof window !== 'undefined'
                ? fromEvent(document, 'keyup')
                      .pipe(takeUntil(this._unsubscribeAll$))
                      .subscribe((ev: any) => {
                          if (ev.keyCode === 122 || ev.which === 122) {
                              ev.preventDefault();
                          }
                      })
                : null;

        /**
         * Is Electron
         */
        if (this._vimboelectronService.isElectronApp) {
            this.isElectron = true;
            this.draggable = 'enable-draggable';
        }

        /**
         * Subscribe User
         */
        this._storageService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((user) => {
                if (user && user.length && user[0].data) {
                    // user
                    this.user = user[0].data;
                    // empresas
                    this.multiAccountCompanies = this._sortPipe.transform(
                        user[0].data.empresas,
                        'emp_nome'
                    ) as [MultiConta];
                    // empresa atual
                    this.currentCompanyMultiAccount = {
                        _id: user[0].data.empId,
                        emp_nome: user[0].data.empresa
                    };
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
     * Alterna entre dark e ligth, conforme o user clicar
     */
    setThemeDarkORLight(): void {
        if (this.isThemeLight) {
            if (typeof window === 'undefined') {
                return;
            }
            window.localStorage.setItem('modoLightPWAVimbo', 'false');
            this.isThemeLight = false;

            const themaBlack = {
                colorTheme: 'theme-blue-gray-dark',
                layout: {
                    navbar: {
                        primaryBackground: 'vimbo-navy-900',
                        secondaryBackground: 'light-blue-600'
                    },
                    toolbar: {
                        background: 'vimbo-navy-800'
                    }
                }
            };

            this._vimboConfigService.setConfig(themaBlack);
        } else {
            if (typeof window === 'undefined') {
                return;
            }
            window.localStorage.setItem('modoLightPWAVimbo', 'true');
            this.isThemeLight = true;

            const themalight = {
                colorTheme: 'theme-default',
                layout: {
                    navbar: {
                        primaryBackground: 'vimbo-white-500',
                        secondaryBackground: 'light-blue-600'
                    },
                    toolbar: {
                        background: 'light-blue-600'
                    }
                }
            };

            this._vimboConfigService.setConfig(themalight);
        }
    }

    /**
     * Com base no thema do storage, é aplicado
     */
    updateThemeStorage(): void {
        if (typeof window === 'undefined') {
            return;
        }
        // deve tar logado
        if (window.localStorage.getItem('vimbo_token')) {
            const themaBlack = {
                colorTheme: 'theme-blue-gray-dark',
                layout: {
                    navbar: {
                        primaryBackground: 'vimbo-navy-900',
                        secondaryBackground: 'light-blue-600'
                    },
                    toolbar: {
                        background: 'vimbo-navy-800'
                    }
                }
            };

            const themalight = {
                colorTheme: 'theme-default',
                layout: {
                    navbar: {
                        primaryBackground: 'vimbo-white-500',
                        secondaryBackground: 'light-blue-600'
                    },
                    toolbar: {
                        background: 'light-blue-600'
                    }
                }
            };

            if (!this.isThemeLight) {
                // this._vimboConfigService.config = themaBlack;
                // this._vimboConfigService.setConfig(themaBlack, {emitEvent: false})
                this._vimboConfigService.setConfig(themaBlack);
            } else {
                this._vimboConfigService.setConfig(themalight);
                // this._vimboConfigService.config = themalight;
            }

            // this._vimboConfigService.setConfig(var, {emitEvent: false})
        }
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._vimboSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Electron - minimize
     */
    minimizeAPP(): void {
        if (!this.isElectron || !window) {
            return;
        }
        this._vimboelectronService.remote.getCurrentWindow().minimize();
    }

    /**
     * Electron - Maxime or Restore
     */
    maximizeOrRestoreAPP(): void {
        if (!this.isElectron || !window) {
            return;
        }
        if (
            this._vimboelectronService.remote.getCurrentWindow().isMaximized()
        ) {
            this._vimboelectronService.remote.getCurrentWindow().unmaximize();
        } else {
            this._vimboelectronService.remote.getCurrentWindow().maximize();
        }
    }

    /**
     * Electron - Close
     */
    closeAPP(): void {
        if (!this.isElectron || !window) {
            return;
        }
        this._vimboelectronService.remote.getCurrentWindow().close();
    }

    /**
     * Change Account
     */
    changeAccount(data): void {
        if (data) {
            console.log('chnage', data);

            this.confirmDialogRef = this._matDialog.open(
                VimboConfirmDialogComponent,
                {
                    disableClose: false,
                    panelClass: 'contact-form-dialog',
                    data: {
                        titleMessage: `Deseja realmente trocar de conta ${this.user.nome} ?`,
                        confirmMessage: `
                        <img src="assets/images/modal/background_swap_conta.svg" class="image-content-modal" /><br>
                        Os dados serão atualizados para a conta <b>${data.emp_nome}</b> <br>e qualquer informação não salva será perdida.`
                    }
                }
            );

            this.confirmDialogRef
                .afterClosed()
                .pipe(takeUntil(this._unsubscribeAll$))
                .subscribe((result) => {
                    if (result) {
                        this._vimboProgressBarService.show();
                        const id = data.emp_id ? data.emp_id : data._id;

                        this._changeAccountService
                            .resolve(id)
                            .then((response) => {
                                this._vimboProgressBarService.hide();
                                console.log('response http', response);

                                if (response.erro) {
                                    this._callVimboNotificationService.onNotification.next(
                                        [
                                            {
                                                message: `Não foi possível trocar de conta`,
                                                status: 'danger',
                                                autoClose: true
                                            }
                                        ]
                                    );
                                } else {
                                    this._callVimboNotificationService.onNotification.next(
                                        [
                                            {
                                                message: `Troca de conta efetuada com sucesso <b>${response.data.usu_nome}</b>`,
                                                status: 'success',
                                                autoClose: true
                                            }
                                        ]
                                    );
                                }
                            })
                            .catch((err) => console.error(err));
                    }
                });
        }
    }
}
