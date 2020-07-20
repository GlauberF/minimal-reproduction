import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

// Core Vimbo
import { VimboSidebarService } from '@vimbo/components/sidebar/sidebar.service';
import { vimboAnimations } from '@vimbo/animations';
import { EncryptDecryptRc4Service } from '@vimbo/services/encrypt-decrypt-rc4.service';
import {
    LoggedUserInterface,
    StorageService
} from '@vimbo/services/storage.service';

// Module
import { ProjectDashboardService as ComponentService } from 'app/main/apps/dashboards/empresa/services/empresa.service';

@Component({
    selector: 'empresa-dashboard',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: vimboAnimations
})
export class EmpresaDashboardComponent implements OnInit, OnDestroy {
    user: LoggedUserInterface;
    sentence: string;

    private _unsubscribeAll$: Subject<any>;

    constructor(
        private _vimboSidebarService: VimboSidebarService,
        private _componentService: ComponentService,
        private _EncryptDecryptRc4Service: EncryptDecryptRc4Service,
        private _storageService: StorageService
    ) {
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = this._storageService.get.user();
        this.sentence = this._componentService.getRandomSentence();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._vimboSidebarService.getSidebar(name).toggleOpen();
    }
}
