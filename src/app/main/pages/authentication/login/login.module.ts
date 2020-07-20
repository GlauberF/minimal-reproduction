import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

// Core Vimbo
import {
    VimboErrorMessageFormcontrolModule,
    VimboMessageBoxesModule
} from '@vimbo/components';
import { VimboDirectivesModule } from '@vimbo/directives/directives';

// Module
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { LazyServiceModuleLogin } from './services/lazy-service.module';

const routes = [
    {
        path: 'auth/login',
        data: {
            title: {
                en: 'Log In',
                pt_BR: 'Entrar'
            }
        },
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LazyServiceModuleLogin,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        VimboMessageBoxesModule,
        VimboErrorMessageFormcontrolModule,
        TranslateModule,
        VimboDirectivesModule
    ]
})
export class LoginModule {}
