import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VirtualDOMService } from './virtual-dom.service';

@Injectable({
    providedIn: 'root'
})
export class RouterExtendService {
    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    constructor(
        private router: Router,
        private _virtualDOMService: VirtualDOMService
    ) {}

    subscribeEvent(): void {
        // check is server
        if (typeof window === 'undefined') {
            return;
        }

        this.currentUrl = this.router.url;

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;

                // SeStorage
                this._virtualDOMService
                    .windowRef()
                    .localStorage.setItem('previousUrl', this.previousUrl);
                this._virtualDOMService
                    .windowRef()
                    .localStorage.setItem('currentUrl', this.currentUrl);
            }
        });
    }

    public getPreviousUrl(): string {
        return this.previousUrl;
    }
}
