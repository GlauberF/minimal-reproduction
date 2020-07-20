import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
// import * as monacoTypes from 'ngx-monaco-editor/monaco';

@Injectable({
    providedIn: 'root'
})
export class VirtualDOMService {
    constructor(
        @Inject(DOCUMENT) private docRef: Document,
        @Inject(PLATFORM_ID) private platformId: any
    ) {}

    /**
     * window object reference, using an angular token and checking
     * if the source of access is via platform browser
     * @constructor
     */
    windowRef(): Window {
        // return isPlatformBrowser(this.platformId) ? this.docRef.defaultView : null;
        return this.docRef.defaultView;
    }

    /**
     * document object reference, using an angular token and checking
     * if the source of access is via platform browser
     * @constructor
     */
    documentRef(): Document {
        // return isPlatformBrowser(this.platformId) ? this.docRef : null;
        return this.docRef;
    }

    /**
     * Check is Browser origin
     */
    isPlatformBrowserRef(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    /**
     * Check is Server origin
     */
    isPlatformServerRef(): boolean {
        return isPlatformServer(this.platformId);
    }
}

/********************************************************
 * Add extra types to the window object
 *******************************************************/
declare global {
    interface Window {
        // monaco: monaco|any;
        monaco: any;
        URL: {
            new (url: string, base?: string | URL): URL;
            createObjectURL(object: any): string;
            revokeObjectURL(url: string): void;
        };
    }
}
