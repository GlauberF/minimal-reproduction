import { Injectable } from '@angular/core';
import { EncryptDecryptRc4Service } from './encrypt-decrypt-rc4.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { VirtualDOMService } from './virtual-dom.service';

export interface StorageNotification {
    data: any;
    notify: boolean;
}

export interface LoggedUserInterface {
    nome?: string;
    sobrenome?: string;
    empresa?: string;
    foto?: string;
    email?: string;
    id: string;
    admEmp?: boolean;
    temParceiro?: {
        _id: string;
        emp_id?: string;
        par_email?: string;
        emp_nome?: string;
        emp_telefones?: string[];
    }[];
    fazParteEmpId?: string;
    fazParteEmpDesc?: string;
    empId?: string;
    idioma?: string;
    empresas?: {
        _id: string;
        emp_nome: string;
    }[];
    // token?: string;
    // modulos?: ModulesLoggedUserInterface[]
}

export interface ModulesLoggedUserInterface {
    mod_id: string;
    mod_nome: string;
    mod_slug: string;
    permissoes: {
        c: boolean;
        r: boolean;
        u: boolean;
        d: boolean;
    };
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storageUser: LoggedUserInterface;
    private _storageModules: ModulesLoggedUserInterface[];
    private _storageLanguage: string;
    private _storageVimboToken: string;
    private _instanceEncryptDecryptRc4Service: EncryptDecryptRc4Service;
    private _keysStorage: string[] = [
        'currentUser',
        'vbm',
        'vimbo_token',
        'sentry_vb',
        'language',
        'config_emp'
    ];

    onUserChanged: BehaviorSubject<StorageNotification[]>;
    onModulesChanged: BehaviorSubject<StorageNotification[]>;
    onDynamicChanged: BehaviorSubject<any>;
    onLanguageChanged: BehaviorSubject<StorageNotification[]>;
    onVimboTokenChanged: BehaviorSubject<StorageNotification[]>;

    constructor(private _virtualDOMService: VirtualDOMService) {
        // Initialize the services
        this._init();
    }

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void {
        // isPlatformServerRef
        if (
            this._virtualDOMService.isPlatformServerRef() ||
            typeof window === 'undefined'
        ) {
            return;
        }

        this._instanceEncryptDecryptRc4Service = new EncryptDecryptRc4Service();

        // Storage User
        this._storageUser = window.localStorage.getItem('currentUser')
            ? JSON.parse(
                  this._instanceEncryptDecryptRc4Service.Decrypt(
                      window.localStorage.getItem('currentUser')
                  )
              )
            : null;
        // Storage Module
        this._storageModules = window.localStorage.getItem('vbm')
            ? JSON.parse(
                  this._instanceEncryptDecryptRc4Service.Decrypt(
                      window.localStorage.getItem('vbm')
                  )
              )
            : null;
        // language Module
        this._storageLanguage = window.localStorage.getItem('language');
        this._storageVimboToken = window.localStorage.getItem('vimbo_token');

        // Behavior
        this.onUserChanged = new BehaviorSubject<StorageNotification[]>([
            { data: this._storageUser, notify: false }
        ]);
        this.onModulesChanged = new BehaviorSubject<StorageNotification[]>([
            { data: this._storageModules, notify: false }
        ]);
        this.onLanguageChanged = new BehaviorSubject<StorageNotification[]>([
            { data: this._storageLanguage, notify: false }
        ]);
        this.onVimboTokenChanged = new BehaviorSubject<StorageNotification[]>([
            {
                data: this._storageVimboToken,
                notify: false
            }
        ]);
        this.onDynamicChanged = new BehaviorSubject<any>([]);

        /**
         * Sync Tabs
         */
        fromEvent<StorageEvent>(window, 'storage')
            .pipe(
                filter((evt) => this._keysStorage.includes(evt.key)),
                filter((evt) => evt.newValue !== evt.oldValue)
                // filter(evt => evt.newValue !== null),
            )
            .subscribe((storage) => {
                if (
                    storage.key !== 'sentry_vb' &&
                    storage.key !== 'config_emp'
                ) {
                    this.set[storage.key](storage.newValue, 'sys');
                }

                // has been logged out
                if (!storage.newValue) {
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this._virtualDOMService.windowRef().location.reload();
                    });
                }
            });
    }

    /**
     * Método GET
     */
    // tslint:disable-next-line:member-ordering
    public get = {
        /**
         * Get user
         */
        user: (): LoggedUserInterface => {
            if (this._storageUser) {
                return this._storageUser;
            } else {
                return;
            }
        },

        /**
         * Get modules
         */
        modules: (): ModulesLoggedUserInterface[] => {
            if (this._storageModules) {
                return this._storageModules;
            } else {
                return;
            }
        },

        /**
         * Get language
         */
        language: (): string => {
            if (this._storageLanguage) {
                return this._storageLanguage;
            } else {
                return 'pt_BR';
            }
        },

        /**
         * Get language
         */
        vimboToken: (): string => {
            if (this._storageVimboToken) {
                return this._storageVimboToken;
            } else {
                return;
            }
        },

        /**
         * Get value in storage dynamic
         * @param campo
         * @param decrypt
         */
        dynamic: (campo: string, decrypt: boolean): any => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (campo) {
                if (decrypt) {
                    return window.localStorage.getItem(campo)
                        ? JSON.parse(
                              this._instanceEncryptDecryptRc4Service.Decrypt(
                                  window.localStorage.getItem(campo)
                              )
                          )
                        : null;
                } else {
                    return window.localStorage.getItem(campo)
                        ? JSON.parse(window.localStorage.getItem(campo))
                        : null;
                }
            }
        }
    };

    /**
     * Método SET
     */
    // tslint:disable-next-line:member-ordering
    public set = {
        /**
         * Set user
         * @param data
         * @param source
         */
        currentUser: async (data: LoggedUserInterface, source: string) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (data) {
                // source is user, set value in storage
                if (source && source === 'user') {
                    const encDadosUser = this._instanceEncryptDecryptRc4Service.Encrypt(
                        JSON.stringify(data)
                    );
                    window.localStorage.setItem('currentUser', encDadosUser);
                    this.onUserChanged.next([{ data: data, notify: true }]);
                    this._storageUser = data;
                }
                // source is system, only notify
                if (source && source === 'sys') {
                    this.onUserChanged.next([
                        {
                            data: JSON.parse(
                                this._instanceEncryptDecryptRc4Service.Decrypt(
                                    data
                                )
                            ),
                            notify: true
                        }
                    ]);
                }
            } else {
                return;
            }
        },

        /**
         * Set modules
         * @param data
         * @param source
         */
        vbm: async (data: ModulesLoggedUserInterface[], source: string) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (data) {
                // source is user, set value in storage
                if (source && source === 'user') {
                    const encDadosModules = this._instanceEncryptDecryptRc4Service.Encrypt(
                        JSON.stringify(data)
                    );
                    window.localStorage.setItem('vbm', encDadosModules);
                    this.onModulesChanged.next([{ data: data, notify: true }]);
                    this._storageModules = data;
                }
                // source is system, only notify
                if (source && source === 'sys') {
                    this.onModulesChanged.next([
                        {
                            data: JSON.parse(
                                this._instanceEncryptDecryptRc4Service.Decrypt(
                                    data
                                )
                            ),
                            notify: true
                        }
                    ]);
                }
            } else {
                return;
            }
        },

        /**
         * Set Vimbo Token
         * @param data
         * @param source
         */
        vimbo_token: async (data: string, source: string) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (data) {
                // source is user, set value in storage
                if (source && source === 'user') {
                    window.localStorage.setItem('vimbo_token', data);
                }
                // Notifica
                this.onVimboTokenChanged.next([{ data: data, notify: true }]);
                this._storageVimboToken = data;
            } else {
                return;
            }
        },

        /**
         * Set language
         * @param data
         * @param source
         */
        language: async (data: string, source: string) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (data) {
                // source is user, set value in storage
                if (source && source === 'user') {
                    window.localStorage.setItem('language', data);
                }
                // Notifica
                this.onLanguageChanged.next([{ data: data, notify: true }]);
                this._storageLanguage = data;
            } else {
                return;
            }
        },

        /**
         * Set in localstorage dynamic
         * @param field
         * @param data
         * @param stringify
         * @param encrypt
         * @param source
         */
        dynamic: async (
            field: string,
            data: any,
            stringify: boolean,
            encrypt: boolean,
            source: string
        ) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (field && data) {
                // source is user, set value in storage
                if (source && source === 'user') {
                    let parseData = data;
                    if (stringify) {
                        parseData = JSON.stringify(data);
                    }

                    if (encrypt) {
                        window.localStorage.setItem(
                            field,
                            this._instanceEncryptDecryptRc4Service.Encrypt(
                                parseData
                            )
                        );
                    } else {
                        window.localStorage.setItem(field, parseData);
                    }
                }

                // Notifica
                this.onDynamicChanged.next([
                    {
                        field: field,
                        data: data
                    }
                ]);
            }
        }
    };

    /**
     * Method DEL
     */
    // tslint:disable-next-line:member-ordering
    public del = {
        /**
         * Del user
         * @param source
         */
        all: async (source: string) => {
            if (this._virtualDOMService.isPlatformServerRef()) {
                return;
            }

            if (source) {
                // source is user, remove value in storage
                if (source === 'user') {
                    window.localStorage.removeItem('currentUser');
                    window.localStorage.removeItem('vbm');
                    window.localStorage.removeItem('vimbo_token');
                    window.localStorage.removeItem('language');
                    window.localStorage.removeItem('previousUrl');
                    window.localStorage.removeItem('sentry_vb');
                    window.localStorage.removeItem('config_emp');
                    window.localStorage.removeItem('currentUrl');
                }
            } else {
                return;
            }
        }
    };
}
