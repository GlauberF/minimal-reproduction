/*
 * Vimbo Sidebar Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 30/12/2019 09:24
 *
 */

import { Injectable } from '@angular/core';

import { VimboSidebarComponent } from './sidebar.component';
import { VirtualDOMService } from '@vimbo/services/virtual-dom.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class VimboSidebarService {
    // Private
    private _registry: { [key: string]: VimboSidebarComponent } = {};

    /**
     * Constructor
     */
    constructor(
        private _virtualDOMService: VirtualDOMService,
        private _deviceDetectorService: DeviceDetectorService
    ) {}

    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    register(key, sidebar): void {
        // Check if the key already being used
        if (this._registry[key]) {
            console.error(
                `The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`
            );

            return;
        }

        // Add to the registry
        this._registry[key] = sidebar;
    }

    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    unregister(key): void {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(
                `The sidebar with the key '${key}' doesn't exist in the registry.`
            );
        }

        // Unregister the sidebar
        delete this._registry[key];
    }

    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {VimboSidebarComponent}
     */
    getSidebar(key): VimboSidebarComponent {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(
                `The sidebar with the key '${key}' doesn't exist in the registry.`
            );

            return;
        }

        // Return the sidebar
        return this._registry[key];
    }

    /**
     * Check if a particular sidebar has been stored in storage
     * and what is its last value
     * @param KeyStorage
     */
    isFoldedByStorage(KeyStorage: string): boolean {
        if (typeof window === 'undefined') {
            return false;
        }

        // Mobile
        if (this._deviceDetectorService.isMobile()) {
            return false;
        }

        return this._virtualDOMService
            .windowRef()
            .localStorage.getItem(KeyStorage)
            ? JSON.parse(
                  this._virtualDOMService
                      .windowRef()
                      .localStorage.getItem(KeyStorage)
              )
            : false;
    }
}
