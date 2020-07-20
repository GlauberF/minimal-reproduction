import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PostMessageVimboService } from '@vimbo/services/post-message-vimbo.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private router: Router,
        private postMessageVimboService: PostMessageVimboService
    ) {}

    hasToken(): any {
        return (
            typeof window !== 'undefined' &&
            window.localStorage.getItem('vimbo_token') !== null &&
            window.localStorage.getItem('currentUser') !== null
        );
    }

    /**
     * CanActivate
     * @param route
     * @param state
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.hasToken()) {
            //  CLEAR STORAGE
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
            }
            // REDIRECT TO LOGIN
            this.router.navigate(['/pages/auth/login']);

            this.postMessageVimboService.send({
                logado: false
            });
            return false;
        } else {
            this.postMessageVimboService.send({
                logado: true
            });
            return true;
        }

        // esta expirado
        /**
         * return this.auth.refresh().pipe(
         *  map(data) => true,
         *  catchError(() => {
         *      this.router.navigate(['/login'])
         *      throwError(false)
         *   })
         * )
         */
    }

    /**
     * CanLoad
     * @param route
     */
    canLoad(route: Route): boolean | Promise<boolean> | Observable<boolean> {
        if (!this.hasToken()) {
            //  CLEAR STORAGE
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
            }
            // REDIRECT TO LOGIN
            this.router.navigate(['/pages/auth/login']);

            this.postMessageVimboService.send({
                logado: false
            });
        } else {
            this.postMessageVimboService.send({
                logado: true
            });
        }
        return this.hasToken();
    }
}
