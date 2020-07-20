import { Injectable, NgZone } from '@angular/core';
import { EchoConfig, EchoService } from 'ngx-laravel-echo';

// Core Vimbo
import {
    LoggedUserInterface,
    StorageService
} from '@vimbo/services/storage.service';

// Auxiliary files
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketService extends EchoService {
    user: LoggedUserInterface;
    connect: EchoService;
    extraConfig: EchoConfig;

    constructor(
        private _storageService: StorageService,
        private _echoService: EchoService,
        private _ngZone: NgZone
    ) {
        super(_ngZone, environment.echoConfig);
        this.user = this._storageService.get.user();
        this.extraConfig = {
            ...environment.echoConfig
        };
    }

    /**
     * Login
     */
    login(): EchoService {
        if (typeof window === 'undefined') {
            return;
        }

        // Update Variable User
        this.user = this._storageService.get.user();

        // Save login reference
        this.connect = this._echoService.login(
            {
                'Authorization': `Bearer ${this._storageService.get.vimboToken()}`
            },
            this.user ? this.user.id : 0
        );

        // Debug Raw Connection State
        if (
            this.extraConfig &&
            this.extraConfig.options &&
            this.extraConfig.options.debugRawConnectionState &&
            !environment.production
        ) {
            this.connect.rawConnectionState.subscribe((res) => {
                console.log('[DebugRawConnectionState]', res);
                console.log('[socketId] =>', this.socketId);
                console.log('[connected] =>', this.connected);
            });
        }

        // return Instance the login
        return this.connect;
    }

    /**
     * Update Login
     */
    updateLogin(): EchoService {
        if (typeof window === 'undefined') {
            return;
        }

        this._echoService.logout();
        return this.login();
    }
}
