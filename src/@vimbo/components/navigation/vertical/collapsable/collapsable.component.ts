import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { _vimboNavigationItem } from '@vimbo/types';
import { vimboAnimations } from '@vimbo/animations';
import { VimboNavigationService } from '@vimbo/components/navigation/navigation.service';
import { VimboUtils } from '@vimbo/utils';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'vimbo-nav-vertical-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss'],
    animations: vimboAnimations
})
export class VimboNavVerticalCollapsableComponent implements OnInit, OnDestroy {
    @Input()
    item: _vimboNavigationItem;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @HostBinding('class.open')
    public isOpen = false;

    // Private
    private _unsubscribeAll$: Subject<any>;

    /**
     * Constructor
     *
     * @param document
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {VimboNavigationService} _vimboNavigationService
     * @param {Router} _router
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _changeDetectorRef: ChangeDetectorRef,
        private _vimboNavigationService: VimboNavigationService,
        private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll$ = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Add new value for hidden through Destructuring
        this.item = {
            ...this.item,
            hidden: VimboUtils.returnsValueFromComplexVar(this.item.hidden)
        };

        // Listen for router events
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe((event: NavigationEnd) => {
                // Check if the url can be found in
                // one of the children of this item
                if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
                    this.expand();
                } else {
                    this.collapse();
                }
            });

        // Listen for collapsing of any navigation item
        this._vimboNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((clickedItem) => {
                if (clickedItem && clickedItem.children) {
                    // Check if the clicked item is one
                    // of the children of this item
                    if (this.isChildrenOf(this.item, clickedItem)) {
                        return;
                    }

                    // Check if the url can be found in
                    // one of the children of this item
                    if (this.isUrlInChildren(this.item, this._router.url)) {
                        return;
                    }

                    // If the clicked item is not this item, collapse...
                    if (this.item !== clickedItem) {
                        this.collapse();
                    }
                }
            });

        // Check if the url can be found in
        // one of the children of this item
        if (this.isUrlInChildren(this.item, this._router.url)) {
            this.expand();
        } else {
            this.collapse();
        }

        // Subscribe to navigation item
        merge(
            this._vimboNavigationService.onNavigationItemAdded,
            this._vimboNavigationService.onNavigationItemUpdated,
            this._vimboNavigationService.onNavigationItemRemoved
        )
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
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
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev): void {
        ev.preventDefault();

        this.isOpen = !this.isOpen;

        // Navigation collapse toggled...
        this._vimboNavigationService.onItemCollapsed.next(this.item);
        this._vimboNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Expand the collapsable navigation
     */
    expand(): void {
        if (this.isOpen) {
            return;
        }

        this.isOpen = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        this._vimboNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Collapse the collapsable navigation
     */
    collapse(): void {
        if (!this.isOpen) {
            return;
        }

        this.isOpen = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        this._vimboNavigationService.onItemCollapseToggled.next();
    }

    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    isChildrenOf(parent, item): boolean {
        const children = parent.children;

        if (!children) {
            return false;
        }

        if (children.indexOf(item) > -1) {
            return true;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isChildrenOf(child, item)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    isUrlInChildren(parent, url): boolean {
        const children = parent.children;

        if (!children) {
            return false;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isUrlInChildren(child, url)) {
                    return true;
                }
            }

            if (child.url === url || url.includes(child.url)) {
                return true;
            }
        }

        return false;
    }
}
