import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// Core Vimbo
import { VimboConfigService } from '@vimbo/services/config.service';
import { vimboAnimations } from '@vimbo/animations';
import { StorageConfigBusinessService } from '@vimbo/services/storage-config-business.service';
import { enumTypesMessageBoxes } from '@vimbo/components/message-boxes/message-boxes.component';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { StorageService } from '@vimbo/services/storage.service';
import { VimboTranslationLoaderService } from '@vimbo/services/translation-loader.service';

// module
import { LoginService } from './services/login.service';
import { locale as localeEnglish } from './i18n/en';
import { locale as localePortugues } from './i18n/pt_BR';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: vimboAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    callInProgress: boolean;
    statusMessage: {
        status: keyof typeof enumTypesMessageBoxes;
        text: string;
    };

    /**
     * Constructor
     *
     * @param {VimboConfigService} _vimboConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} _router
     * @param {LoginService} _loginService
     * @param {StorageService} _storageService
     * @param {StorageConfigBusinessService} _storageConfigBusinessService
     * @param {VirtualDOMService} _virtualDOMService
     * @param {VimboTranslationLoaderService} _vimboTranslationLoaderService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _vimboConfigService: VimboConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _loginService: LoginService,
        private _storageService: StorageService,
        private _storageConfigBusinessService: StorageConfigBusinessService,
        private _virtualDOMService: VirtualDOMService,
        private _vimboTranslationLoaderService: VimboTranslationLoaderService,
        private _translateService: TranslateService
    ) {
        // Set translations
        this._vimboTranslationLoaderService.loadTranslations(
            localeEnglish,
            localePortugues
        );

        // Configure the layout
        this._vimboConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this.callInProgress = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            usu_email: ['', [Validators.required, Validators.email]],
            usu_senha: ['', Validators.required]
        });
    }

    /**
     *
     */
    logIn(): void {
        this.callInProgress = true;

        this._loginService
            .send(this.loginForm.value)
            .then((response) => {
                this.callInProgress = false;

                if (response.erro && response.email_confirmado) {
                    this.statusMessage = {
                        status: 'danger',
                        text: this._translateService.instant(
                            'Email ou Senha inválidos'
                        )
                    };
                    this._virtualDOMService.windowRef().setTimeout(() => {
                        this.statusMessage = null;
                    }, 3000);

                    return;
                } else if (!response.email_confirmado) {
                    this.statusMessage = {
                        status: 'danger',
                        text: this._translateService.instant(
                            'Email não confirmado'
                        )
                    };

                    this._virtualDOMService.windowRef().setTimeout(() => {
                        // this.statusMessage = null;
                        this._router.navigate([
                            `/pages/auth/mail-confirm/email/${this.loginForm.value.usu_email}`
                        ]);
                    }, 3000);

                    return;
                } else {
                    this.statusMessage = {
                        status: 'success',
                        text: this._translateService.instant(
                            'Login efetuado com sucesso, aguarde'
                        )
                    };

                    const userDate = {
                        nome: response.data.usu_nome,
                        sobrenome: response.data.usu_sobrenome,
                        empresa: response.data.emp_nome,
                        foto: response.data.usu_foto,
                        email: this.loginForm.value.usu_email,
                        id: response.data._id,
                        admEmp: response.data.usu_dono_empresa,
                        temParceiro: response.data.par_id_parceiro,
                        fazParteEmpId: response.data.tem_id_empresa['0']._id,
                        fazParteEmpDesc:
                            response.data.tem_id_empresa['0'].tem_descricao,
                        empId: response.data.emp_id,
                        idioma: response.data.usu_linguagem,
                        empresas: response.data.empresas
                    };

                    const respostaToken = response.data.token;

                    this._storageService.set.currentUser(userDate, 'user');
                    this._storageService.set.vbm(response.data.modulos, 'user');
                    this._storageService.set.vimbo_token(respostaToken, 'user');
                    this._storageService.set.language(
                        response.data.usu_linguagem,
                        'user'
                    );
                    this._storageService.set.dynamic(
                        'sentry_vb',
                        { email: this.loginForm.value.usu_email },
                        true,
                        false,
                        'user'
                    );

                    // To make it easier to find company settings, to check at
                    // certain times, let's save to storage
                    this._storageConfigBusinessService
                        .setData(response.data.emp_id, null)
                        .then(() => {
                            // redireciona
                            this._router.navigate(['/apps/dashboard/company']);
                        })
                        .catch((er) => {
                            console.error(er);

                            // redireciona
                            this._router.navigate(['/apps/dashboard/company']);
                        });

                    // redireciona
                    // this._router.navigate(['/apps/dashboard/company']);
                }
            })
            .catch((er) => {
                this.statusMessage = {
                    status: 'danger',
                    text: er
                };

                this._virtualDOMService.windowRef().setTimeout(() => {
                    this.statusMessage = null;
                }, 3000);
            });

        // this._router.navigate(['/dashboards']);
    }
}
