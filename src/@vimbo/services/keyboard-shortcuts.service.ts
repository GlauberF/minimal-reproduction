/*
 * Vimbo Keyboard Shortcuts Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 22/04/2020 21:16
 */

import { Injectable } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { cloneDeep, isEqual } from 'lodash';

// Core Vimbo
import { VimboCheckDataTypes } from '@vimbo/utils/check-data-types';
import { VirtualDOMService } from './virtual-dom.service';

@Injectable({
    providedIn: 'root'
})
export class VimboKeyboardShortcutsService {
    /**
     * Constructor
     * @param {HotkeysService} _hotkeysService
     * @param {VirtualDOMService} _virtualDOMService
     */
    constructor(
        private _hotkeysService: HotkeysService,
        private _virtualDOMService: VirtualDOMService
    ) {
        this._init();
    }

    /**
     * Initialize w/ shortcut help
     * @private
     */
    private _init(): void {
        // this._hotkeysService.add(
        //     new Hotkey('f1', (event: KeyboardEvent, combo: string) => {
        //         return false;
        //     })
        // );
    }

    /**
     * Set Shortcut
     * @param data
     */
    setShortcut(data: Hotkey | Hotkey[]): void {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        // No data
        if (!data) {
            return;
        }

        // Creates temporary variable
        const _temporaryData = cloneDeep(data);

        // Hotkey Array
        if (VimboCheckDataTypes.check(_temporaryData).isArray) {
            (_temporaryData as Hotkey[]).forEach((el: Hotkey) => {
                // Is Key Help
                if (el.combo === 'f1' || el.combo === '?') {
                    return;
                }

                // First removes the new combo, if it already exists
                // Get current data
                if (
                    VimboCheckDataTypes.check(this._hotkeysService.get())
                        .isArray
                ) {
                    // Is Array, forEach
                    (this._hotkeysService.get() as Hotkey[]).forEach(
                        (elGetService) => {
                            // Is Equal
                            if (
                                isEqual(
                                    this.format(el.combo),
                                    elGetService.combo
                                )
                            ) {
                                // Remove
                                this._hotkeysService.remove(elGetService);
                            }
                        }
                    );
                }

                // Add new combo
                this._virtualDOMService.windowRef().setTimeout((time) => {
                    this._hotkeysService.add(
                        new Hotkey(
                            el.combo,
                            el.callback,
                            el.allowIn,
                            el.description,
                            el.action,
                            el.persistent
                        )
                    );
                });
            });
        }

        // Hotkey Object
        else {
            // Is Key Help
            if (
                (_temporaryData as Hotkey).combo === 'f1' ||
                (_temporaryData as Hotkey).combo === '?'
            ) {
                return;
            }

            // First removes the new combo, if it already exists
            // Get current data
            if (VimboCheckDataTypes.check(this._hotkeysService.get()).isArray) {
                // Is Array, forEach
                (this._hotkeysService.get() as Hotkey[]).forEach(
                    (elGetService) => {
                        // Is Equal
                        if (
                            isEqual(
                                this.format((_temporaryData as Hotkey).combo),
                                elGetService.combo
                            )
                        ) {
                            // Remove
                            this._hotkeysService.remove(elGetService);
                        }
                    }
                );
            }

            // Add new combo
            this._virtualDOMService.windowRef().setTimeout((time) => {
                this._hotkeysService.add(
                    new Hotkey(
                        (_temporaryData as Hotkey).combo,
                        (_temporaryData as Hotkey).callback,
                        (_temporaryData as Hotkey).allowIn,
                        (_temporaryData as Hotkey).description,
                        (_temporaryData as Hotkey).action,
                        (_temporaryData as Hotkey).persistent
                    )
                );
            });
        }
    }

    /**
     * Remove ALL
     * @param cleanAll
     */
    removeALL(cleanAll: boolean = false): Hotkey | Hotkey[] {
        const dataTemporaryDelete = [];

        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        (this._hotkeysService.get() as Hotkey[]).forEach((_hotkey) => {
            // Is Key Help
            if (_hotkey.combo === 'f1' || _hotkey.combo === '?') {
                return;
            }

            dataTemporaryDelete.push(_hotkey);
        });

        return this._hotkeysService.remove(dataTemporaryDelete);
    }

    /**
     * Remove
     * @param hotkey
     * @param cleanAll
     */
    remove(
        hotkey?: Hotkey | Hotkey[],
        cleanAll: boolean = false
    ): Hotkey | Hotkey[] {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        // No data
        if (!hotkey) {
            return;
        }

        // Is Array
        if (VimboCheckDataTypes.check(hotkey).isArray) {
            (hotkey as Hotkey[]).forEach((el: Hotkey) => {
                // Is Key Help
                if (!cleanAll && (el.combo === 'f1' || el.combo === '?')) {
                    return;
                }

                // Take what you have registered, check by the combo if it is the same as the one I'm trying to delete.
                // If it's the same, delete it!
                (this._hotkeysService.get() as Hotkey[]).forEach(
                    (registeredShort) => {
                        if (isEqual(registeredShort.combo, el.combo)) {
                            this._hotkeysService.remove(registeredShort);
                        }
                    }
                );
            });
        }

        // Is Object
        else {
            // Is Key Help
            if (
                !cleanAll &&
                ((hotkey as Hotkey).combo === 'f1' ||
                    (hotkey as Hotkey).combo === '?')
            ) {
                return;
            }

            // Take what you have registered, check by the combo if it is the same as the one I'm trying to delete.
            // If it's the same, delete it!
            (this._hotkeysService.get() as Hotkey[]).forEach(
                (registeredShort) => {
                    if (
                        isEqual(registeredShort.combo, (hotkey as Hotkey).combo)
                    ) {
                        this._hotkeysService.remove(registeredShort);
                    }
                }
            );
        }
    }

    /**
     * Get
     * @param combo
     */
    get(combo?: string | string[]): Hotkey | Hotkey[] {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        return this._hotkeysService.get(combo);
    }

    /**
     * Pause
     * @param hotkey
     */
    pause(hotkey?: Hotkey | Hotkey[]): Hotkey | Hotkey[] {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        return this._hotkeysService.pause(hotkey);
    }

    /**
     * Un Pause
     * @param hotkey
     */
    unpause(hotkey?: Hotkey | Hotkey[]): Hotkey | Hotkey[] {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        return this._hotkeysService.unpause(hotkey);
    }

    /**
     * Format
     * @param data
     */
    format(data: string | string[]): string[] {
        // Is server, return
        if (this._virtualDOMService.isPlatformServerRef()) {
            return;
        }

        const combo = Array.isArray(data) ? data : [data as string];
        const sequence: string[] = combo as Array<string>;
        for (let i = 0; i < sequence.length; i++) {
            sequence[i] = Hotkey.symbolize(sequence[i]);
        }
        return sequence;
    }

    /**
     * Format Shortcuts API
     * - Formats combo field
     * @param APIHotkeyObject
     */
    formatShortcutsAPI(APIHotkeyObject: Array<any>): Hotkey[] {
        if (!APIHotkeyObject) {
            return;
        }

        const _tempHotkeys: Hotkey[] = [];
        (APIHotkeyObject as Hotkey[]).forEach((element) => {
            if (!element.combo) {
                return;
            }
            element.combo = this.format(element.combo);
            _tempHotkeys.push(element);
        });
        return _tempHotkeys;
    }
}
