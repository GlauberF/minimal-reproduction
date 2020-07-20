import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@env/environment';
import { hmrBootstrap } from 'hmr';
import { init } from '@sentry/browser';

if (environment.production) {
    enableProdMode();
    // init sentry
    init({
        dsn: 'https://2fbd8d931ed646e386ba3c67869c73e5@sentry.io/1429610'
    });
    // remove console.log
    if (typeof window !== 'undefined') {
        // window.console.log = function() {};
    }
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    document.addEventListener('DOMContentLoaded', () => {
        bootstrap().catch((err) => console.error(err));
    });
}
