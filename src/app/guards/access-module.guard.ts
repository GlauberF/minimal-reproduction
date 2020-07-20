import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route
} from '@angular/router';
import { Observable } from 'rxjs';

import { RolesService } from '@vimbo/services/roles.service';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { NotificationRedirectGuardService } from './notification-redirect-guard.service';

@Injectable({
    providedIn: 'root'
})
export class AccessModuleGuard implements CanLoad, CanActivate {
    constructor(
        public _rolesService: RolesService,
        private _virtualDOMService: VirtualDOMService,
        private _notificationRedirectGuardService: NotificationRedirectGuardService
    ) {}

    /**
     * Abstraction called NotificationRedirectGuardService
     */
    private callMsgRedirect(): void {
        if (this._virtualDOMService.isPlatformBrowserRef()) {
            this._notificationRedirectGuardService.show(
                true,
                this._virtualDOMService.documentRef().location.pathname
            );
        } else {
            this._notificationRedirectGuardService.show(true, '/');
        }
    }

    /**
     * Logic
     * @param roles
     * @param moduleVimbo
     */
    private check(roles, moduleVimbo): boolean {
        if (!moduleVimbo[0] || !roles[0].operation) {
            return false;
        }

        switch (roles[0].operation) {
            case 'canView':
                if (this._rolesService.modules.canView(moduleVimbo[0])) {
                    return true;
                }

                this.callMsgRedirect();
                return false;
            // break;
            case 'canEdit':
                if (this._rolesService.modules.canEdit(moduleVimbo[0])) {
                    return true;
                }

                this.callMsgRedirect();
                return false;
            // break;
            case 'canCreate':
                if (this._rolesService.modules.canCreate(moduleVimbo[0])) {
                    return true;
                }

                this.callMsgRedirect();
                return false;
            // break;
            case 'canDelete':
                if (this._rolesService.modules.canDelete(moduleVimbo[0])) {
                    return true;
                }

                this.callMsgRedirect();
                return false;
            // break;
            default:
                return false;
        }
    }

    /**
     * CanLoad
     * @param route
     */
    canLoad(route: Route): boolean | Promise<boolean> | Observable<boolean> {
        const moduleVimbo = route.data['moduleVimbo'];
        const roles = route.data['roles'];
        return this.check(roles, moduleVimbo);
    }

    /**
     * CanActivate
     * @param route
     */
    canActivate(
        route: ActivatedRouteSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
        // let roles = route.data["roles"] as Array<object>;
        const moduleVimbo = route.data['moduleVimbo'];
        const roles = route.data['roles'];
        return this.check(roles, moduleVimbo);
    }
}
