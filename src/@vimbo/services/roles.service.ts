import { Injectable } from '@angular/core';
import { EncryptDecryptRc4Service } from '@vimbo/services/encrypt-decrypt-rc4.service';

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    constructor() {
        // Initialize
        this._handleData(true);
    }

    private _encryptDecryptRc4Service: EncryptDecryptRc4Service;
    private _localUser: any;
    private _xUser: any;
    private _parseXUser: any;
    private _localMod: any;
    private _xModule: any;
    private _parseXModule: any;

    /*-----------------------------------------------
    * METHODS PUBLIC
    ------------------------------------------------*/

    /**
     * Check roles for auth
     */
    public auth = {
        /**
         * Usuario logado é o administrador da conta
         */
        isAdm: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.admEmp === true;
            } else {
                return false;
            }
        },

        /**
         * Usuário logado faz parte da vimbo
         */
        isVimbo: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                // return user.fazParteEmpDesc.toLowerCase() === 'vimbo';
                return user.fazParteEmpId === '592c09e00028ce218b37c4b1';
            } else {
                return false;
            }
        },

        /**
         * Usuário logado é parceiro da vimbo
         */
        isParceiro: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                // return user.fazParteEmpDesc.toLowerCase() === 'parceiro';
                return user.fazParteEmpId === '5952b37b9238f39dfdc805a3';
            } else {
                return false;
            }
        },

        /**
         * Usuário logado é uma empresa
         */
        isEmpresa: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                // return user.fazParteEmpDesc.toLowerCase() === 'empresa';
                return user.fazParteEmpId === '5952b36a9238f39dfdc805a2';
            } else {
                return false;
            }
        },

        /**
         * Usuário logado é um desenvolvedor
         */
        isDeveloper: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.fazParteEmpId === '5cbdd3250028ce064134beb2';
            } else {
                return false;
            }
        }
    };

    /**
     * Check roles CRUD for modules
     */
    public modules = {
        /**
         * Passa o nome módulo a ser verificado, se o user tem acesso de visualização
         * @param modulo
         */
        canView: (modulo) => {
            // get local data and handle the data
            this._handleData();

            if (modulo && this._parseXModule) {
                const modAtual = this._parseXModule.filter(
                    (mod) => mod.mod_slug === modulo.toLowerCase()
                );

                return modAtual.length && modAtual['0'].permissoes.r === true;
            } else {
                return false;
            }
        },

        /**
         * Passa o nome módulo a ser verificado, se o user tem acesso de edição
         * @param modulo
         */
        canEdit: (modulo) => {
            // get local data and handle the data
            this._handleData();

            if (modulo && this._parseXModule) {
                const modAtual = this._parseXModule.filter(
                    (mod) => mod.mod_slug === modulo.toLowerCase()
                );
                return modAtual.length && modAtual['0'].permissoes.u === true;
            } else {
                return false;
            }
        },

        /**
         * Passa o nome módulo a ser verificado, se o user tem acesso de criação
         * @param modulo
         */
        canCreate: (modulo) => {
            // get local data and handle the data
            this._handleData();

            if (modulo && this._parseXModule) {
                const modAtual = this._parseXModule.filter(
                    (mod) => mod.mod_slug === modulo.toLowerCase()
                );
                return modAtual.length && modAtual['0'].permissoes.c === true;
            } else {
                return false;
            }
        },

        /**
         * Passa o nome módulo a ser verificado, se o user tem acesso de remoção
         * @param modulo
         */
        canDelete: (modulo) => {
            // get local data and handle the data
            this._handleData();

            if (modulo && this._parseXModule) {
                const modAtual = this._parseXModule.filter(
                    (mod) => mod.mod_slug === modulo.toLowerCase()
                );
                return modAtual.length && modAtual['0'].permissoes.d === true;
            } else {
                return false;
            }
        }
    };

    /**
     * Check if is true or false, se true hide
     * return { () => boolean }
     */
    public hide = {
        /**
         * Usuario logado é o administrador da conta
         */
        isNotAdm: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.admEmp !== true;
            } else {
                return true;
            }
        },

        /**
         * Usuário logado faz parte da vimbo
         */
        isNotVimbo: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.fazParteEmpId !== '592c09e00028ce218b37c4b1';
            } else {
                return true;
            }
        },

        /**
         * Usuário logado é parceiro da vimbo
         */
        isNotParceiro: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.fazParteEmpId !== '5952b37b9238f39dfdc805a3';
            } else {
                return true;
            }
        },

        /**
         * Usuário logado é uma empresa
         */
        isNotEmpresa: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.fazParteEmpId !== '5952b36a9238f39dfdc805a2';
            } else {
                return true;
            }
        },

        /**
         * Usuário logado é um desenvolvedor
         */
        isNotDeveloper: () => {
            // get local data and handle the data
            this._handleData();

            const user = this._parseXUser;
            if (user) {
                return user.fazParteEmpId !== '5cbdd3250028ce064134beb2';
            } else {
                return true;
            }
        },

        // module
        canNotViewModule: (modulo) => {
            // get local data and handle the data
            this._handleData();

            if (modulo && this._parseXModule) {
                const trataModulo = modulo.toLowerCase();
                const modAtual = this._parseXModule.filter(
                    (mod) => mod.mod_slug === trataModulo
                );
                if (!modAtual.length) {
                    return true;
                } else {
                    return (
                        modAtual.length && modAtual['0'].permissoes.r !== true
                    );
                }
            } else {
                return true;
            }
        }
    };

    /*-----------------------------------------------
    * METHODS PRIVATE
    ------------------------------------------------*/

    /**
     * Initialize, Get local data and handle the data
     * @private
     */
    private _handleData(instantiate = false): void {
        if (typeof window === 'undefined') {
            return;
        }

        // create instances
        if (instantiate) {
            this._encryptDecryptRc4Service = new EncryptDecryptRc4Service();
        }

        // user
        this._localUser = window.localStorage.getItem('currentUser');
        this._xUser = this._localUser
            ? this._encryptDecryptRc4Service.Decrypt(this._localUser)
            : null;
        this._parseXUser = this._xUser ? JSON.parse(this._xUser) : null;
        // modules
        this._localMod = window.localStorage.getItem('vbm');
        this._xModule = this._localMod
            ? this._encryptDecryptRc4Service.Decrypt(this._localMod)
            : null;
        this._parseXModule = this._xModule ? JSON.parse(this._xModule) : null;
    }
}
