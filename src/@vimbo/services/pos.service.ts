/*
 * Service to handle POS-related operations
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 08/04/2020 14:17
 */

import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as onScan from 'onscan.js';
import { VirtualDOMService } from './virtual-dom.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PosService {
    onBarcodeScanner: Subject<any>;

    constructor(
        private _deviceService: DeviceDetectorService,
        private _virtualDOMService: VirtualDOMService
    ) {
        this.onBarcodeScanner = new Subject();
    }

    /**
     * Barcode Scanner
     * @param init
     * @param destroy
     * @param notify
     */
    barcodeScanner(
        init: boolean = true,
        destroy: boolean = false,
        notify: boolean = true
    ): void {
        // Accessing via server? returns only!
        if (typeof window === 'undefined') {
            return;
        }

        /**
         * Mobile
         */
        if (this._deviceService.isMobile()) {
        }

        /**
         * Desktop
         */

        if (!this._deviceService.isMobile()) {
            // Start
            if (init) {
                // In init if it already exists, set it to undefined
                // first before following the process
                if ((document as any).scannerDetectionData !== undefined) {
                    this.barcodeScanner(false, true, false);
                }

                // Attach
                this._virtualDOMService.windowRef().setTimeout(() => {
                    (onScan as any).attachTo(document, {
                        // Callback after successful scan.
                        // Alternative to document.addEventListener('scan')
                        onScan: (sCode: string, iQty: number) => {
                            if (notify) {
                                this.onBarcodeScanner.next({
                                    id: 'BARCODE-VIMBO-POS',
                                    sCode,
                                    iQty
                                });
                            }
                        },
                        // output all potentially relevant key
                        // events - great for debugging!
                        onKeyDetect: (
                            iKeyCode: number,
                            oEvent: KeyboardEvent
                        ) => {
                            if (notify) {
                                this.onBarcodeScanner.next({
                                    iKeyCode,
                                    oEvent
                                });
                            }
                        },
                        // Callback after receiving and processing a char
                        // (scanned char in parameter)
                        onKeyProcess: (
                            sChar: string,
                            oEvent: KeyboardEvent
                        ) => {
                            if (notify) {
                                this.onBarcodeScanner.next({ sChar, oEvent });
                            }
                        },
                        // Callback after receiving a value on paste, no
                        // matter if it is a valid code or not
                        onPaste: (sPasted: string, oEvent: Event) => {
                            if (notify) {
                                this.onBarcodeScanner.next({ sPasted, oEvent });
                            }
                        },
                        // Callback after the scan button was pressed and
                        // held down for a time defined in
                        // scanButtonLongPressThreshold. This can only be
                        // used if the scan button behaves as a key itself
                        // and the scanButtonKeyCode option is set.
                        onScanButtonLongPress: (esbLongPress) => {
                            if (notify) {
                                this.onBarcodeScanner.next({ esbLongPress });
                            }
                        },
                        // Callback after a scanned string being dropped
                        // due to restrictions.
                        onScanError: (oDebug: object) => {
                            if (notify) {
                                this.onBarcodeScanner.next({ error: oDebug });
                            }
                        }
                    });

                    // console.log('getOptions', (onScan as any).getOptions(document))
                    // (onScan as any).setOptions(document, {})
                }, 300);
            }

            // Destroyed
            if (destroy) {
                // Detach
                (onScan as any).detachFrom(document);
                if (notify) {
                    this.onBarcodeScanner.next({ detach: true });
                }
            }
        }
    }
}

// declare namespace onScan {
//     interface onScan {
//         attachTo(document, object): Document,
//         detachFrom(document): void,
//     }
// }
