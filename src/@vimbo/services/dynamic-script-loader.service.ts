import { Injectable } from '@angular/core';

interface Scripts {
    name: string;
    src: string;
}

export const ScriptStore: Scripts[] = [
    {
        name: 'vbEditorImg',
        src: '/assets/component/vimbo-editor-image/scripts.min.js?v19'
    }
    // { name: 'random-gen', src: '../../../assets/js/random-num-generator.js' }
];

declare var document: any;

@Injectable({
    providedIn: 'root'
})
export class DynamicScriptLoaderService {
    private scripts: any = {};
    private newScriptStore: Scripts[];

    constructor() {
        this.newScriptStore = [...ScriptStore];
        this._init();
    }

    /**
     * Initialize
     * @private
     */
    private _init(): void {
        this.newScriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: this.isScriptLoaded(script.src),
                src: script.src
            };
        });
    }

    /**
     * Adds script dynamically.
     * @param srcData
     * @public
     */
    public addScript(srcData: Scripts): void {
        this.newScriptStore = [...ScriptStore, srcData];
        this._init();
    }

    /**
     * @description check if script has already been loaded in window.document
     * @param src
     * @public
     * @return boolean
     */
    public isScriptLoaded(src: string): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return document.querySelector('script[src="' + src + '"]');
    }

    /**
     * Loads script dynamically, by name.
     * @param scripts
     * @public
     */
    public load(...scripts: string[]): any {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this._loadScript(script)));
        return Promise.all(promises);
    }

    /**
     * main function
     * @param name
     * @private
     */
    private _loadScript(name: string): any {
        if (typeof window === 'undefined') {
            return;
        }

        return new Promise((resolve, reject) => {
            if (this.scripts[name] && !this.scripts[name].loaded) {
                // load script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                if (script.readyState) {
                    // IE
                    script.onreadystatechange = () => {
                        if (
                            script.readyState === 'loaded' ||
                            script.readyState === 'complete'
                        ) {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({
                                script: name,
                                loaded: true,
                                status: 'Loaded'
                            });
                        }
                    };
                } else {
                    // Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({
                            script: name,
                            loaded: true,
                            status: 'Loaded'
                        });
                    };
                }
                script.onerror = (error: any) =>
                    resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                resolve({
                    script: name,
                    loaded: true,
                    status: 'Already Loaded'
                });
            }
        });
    }
}
