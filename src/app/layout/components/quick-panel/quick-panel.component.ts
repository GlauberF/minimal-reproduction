import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { VimboTranslationLoaderService } from '@vimbo/services/translation-loader.service';

import { locale as quickPanelEnglish } from 'app/layout/components/quick-panel/i18n/en';
import { locale as quickPanelPortugues } from 'app/layout/components/quick-panel/i18n/pt_BR';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit, OnDestroy {
    date: Date;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param {VimboSidebarService} _vimboSidebarService
     * @param {VimboTranslationLoaderService} _vimboTranslationLoaderService
     * @param {Router} _router
     */
    constructor(
        private _vimboSidebarService: VimboSidebarService,
        private _vimboTranslationLoaderService: VimboTranslationLoaderService,
        private _router: Router
    ) {
        // Set translations
        this._vimboTranslationLoaderService.loadTranslations(
            quickPanelEnglish,
            quickPanelPortugues
        );

        // Set the defaults
        this.date = new Date();

        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._vimboSidebarService.getSidebar(key).toggleOpen();
    }

    go(path): void {
        if (!path) {
            return;
        }

        this._router
            .navigate([`${path}`])
            .then((r) => this.toggleSidebarOpen('quickPanel'));
    }
}
