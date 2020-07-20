import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { captureException } from '@sentry/browser';
import { NgxLaravelEchoModule } from 'ngx-laravel-echo';

import { VimboModule } from '@vimbo/vimbo.module';
import { VimboProgressBarModule } from '@vimbo/components';
import { TokenInterceptorService } from '@vimbo/interceptors/token-interceptor.service';
import { RequestInterceptorService } from '../@vimbo/interceptors/request-interceptor.service';
import { ResponseInterceptorService } from '../@vimbo/interceptors/response-interceptor.service';

import { vimboConfig } from 'app/vimbo-config';
import { VerticalLayout1Module } from './layout/vertical/layout-1/layout-1.module';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { GraphQLModule } from './graphql.module';
import { environment } from '@env/environment';
import { AuthGuard } from '@guards/auth.guard';
import { HotkeyModule } from 'angular2-hotkeys';

// init({
//     dsn: 'https://2fbd8d931ed646e386ba3c67869c73e5@sentry.io/1429610'
// });

// language
if (typeof window !== 'undefined') {
    if (
        !window.localStorage.getItem('language') ||
        (window.localStorage.getItem('language') &&
            window.localStorage.getItem('language') !== 'en')
    ) {
        registerLocaleData(ptBr);
    }
} else {
    registerLocaleData(ptBr);
}

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: () =>
            import('./main/apps/apps.module').then((m) => m.AppsModule)
    },
    {
        path: 'pages',
        loadChildren: () =>
            import('./main/pages/pages.module').then((m) => m.PagesModule)
    },
    {
        path: '',
        redirectTo: 'apps/dashboard/company',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'pages/error/error-404'
    }
];

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error): any {
        if (error) {
            captureException(error.originalError || error);
            throw error;
        }
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        // HttpClientModule,

        // HttpClientModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabled'
        }),
        TranslateModule.forRoot(),

        // Keyboard shortcuts
        HotkeyModule.forRoot({
            // cheatSheetHotkey: 'f1',
            // cheatSheetCloseEsc: true,
            // cheatSheetCloseEscDescription: 'Ocultar este menu de ajuda',
            cheatSheetDescription: 'Mostrar/Ocultar este menu de ajuda'
        }),

        // vimbo modules
        VimboModule.forRoot(vimboConfig),
        VimboProgressBarModule,
        // VimboSidebarModule,
        // VimboThemeOptionsModule,

        // App modules
        // HorizontalLayout1Module,
        VerticalLayout1Module,
        AppStoreModule,

        // Graphql
        GraphQLModule,

        // laravel Echo
        NgxLaravelEchoModule.forRoot(environment.echoConfig),

        // worker
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptorService,
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue:
                typeof window !== 'undefined' &&
                window.localStorage.getItem('language') &&
                window.localStorage.getItem('language') === 'en'
                    ? 'en-US'
                    : 'pt'
        },
        {
            provide: ErrorHandler,
            useClass: SentryErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
