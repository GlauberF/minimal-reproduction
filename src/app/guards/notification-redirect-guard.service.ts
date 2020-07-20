import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { CallVimboNotificationService } from '@layoutComponent/content/services/call-vimbo-notification.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationRedirectGuardService {
    constructor(
        private router: Router,
        private _callVimboNotificationService: CallVimboNotificationService,
        private _virtualDOMService: VirtualDOMService
    ) {}

    /**
     * Function intended to show notification when the user does
     * not have access to something and if they prefer to redirect
     * @param redirect
     * @param path
     */
    public show(redirect: boolean, path: string): void {
        // message default
        let msgPT = `<b>Você foi redirecionado.</b><br>Você não tem permissão para acessar!`;
        let msgEN = `<b>You have been redirected.</b><br>You do not have permission to access!`;

        // --------------------------------------------------- //
        // ACCESS ORIGINATES FROM BROWSER
        // --------------------------------------------------- //
        if (this._virtualDOMService.isPlatformBrowserRef()) {
            // mounts to message based on language
            const language = this._virtualDOMService
                .windowRef()
                .localStorage.getItem('language');

            if (path !== '/') {
                msgPT = `<b>Acesso negado.</b><br>Você não tem permissão para acessar!`;
                msgEN = `<b>Access denied.</b><br>You do not have permission to access!`;
            }

            // Redirect
            if (redirect) {
                this.router.navigate([`${path}`]).then((res) => {
                    // show notification for client to be aware on redirect
                    this._callVimboNotificationService.onNotification.next([
                        {
                            status: 'danger',
                            message: `${
                                language && language === 'en' ? msgEN : msgPT
                            }`,
                            autoClose: true
                        }
                    ]);
                });
            }

            // No redirect
            else {
                this._callVimboNotificationService.onNotification.next([
                    {
                        status: 'danger',
                        message: `${
                            language && language === 'en' ? msgEN : msgPT
                        }`,
                        autoClose: true
                    }
                ]);
            }
        }

        // --------------------------------------------------- //
        // ACCESS ORIGINATES FROM SERVER
        // --------------------------------------------------- //
        else {
            // Redirect
            if (redirect) {
                this.router.navigate([`${path}`]).then((res) => {
                    // show notification for client to be aware on redirect
                    this._callVimboNotificationService.onNotification.next([
                        {
                            status: 'danger',
                            message: `${msgPT}`,
                            autoClose: true
                        }
                    ]);
                });
            }
            // No redirect
            else {
                // show notification for client to be aware on redirect
                this._callVimboNotificationService.onNotification.next([
                    {
                        status: 'danger',
                        message: `${msgPT}`,
                        autoClose: true
                    }
                ]);
            }
        }
    }
}
