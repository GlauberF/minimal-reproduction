import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

import { RolesService } from '@vimbo/services/roles.service';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { NotificationRedirectGuardService } from './notification-redirect-guard.service';

@Injectable({
    providedIn: 'root'
})
export class AccessIsVimboGuard implements CanLoad, CanActivate {
    constructor(
        private _rolesService: RolesService,
        private _virtualDOMService: VirtualDOMService,
        private _notificationRedirectGuardService: NotificationRedirectGuardService
    ) {}

    /**
     * Logic
     */
    private checkAccess(): boolean {
        if (this._rolesService.auth.isVimbo()) {
            return true;
        }

        // check if access originates from browser
        // redirect´s
        if (this._virtualDOMService.isPlatformBrowserRef()) {
            this._notificationRedirectGuardService.show(
                true,
                this._virtualDOMService.documentRef().location.pathname
            );
        } else {
            this._notificationRedirectGuardService.show(true, '/');
        }

        return false;
    }

    /**
     * CanLoad
     */
    canLoad(): boolean | Promise<boolean> | Observable<boolean> {
        return this.checkAccess();
    }

    /**
     * CanActivate
     */
    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
        return this.checkAccess();
    }
}
