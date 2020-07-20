/*
 * @author Glauber Funez
 * @package Vimbo
 * Vimbo Tecnologia Ltda ME
 * Copyright (c) 2019.
 */

/**
 * This class is based on the code in the following projects:
 * https://github.com/ThorstenHans/ngx-electron
 */

import { Injectable } from '@angular/core';

import * as Electron from 'electron';

export interface ElectronWindow extends Window {
    require(module: string): Electron.RendererInterface;
}

declare let window: ElectronWindow;

@Injectable({
    providedIn: 'root'
})
export class VimboElectronService {
    private _electron: Electron.RendererInterface;

    private get electron(): Electron.RendererInterface {
        if (!this._electron) {
            if (typeof window !== 'undefined' && window.require) {
                this._electron = window.require('electron');
                return this._electron;
            }
            return;
        }
        return this._electron;
    }

    /**
     * determines if SPA is running in Electron
     */
    public get isElectronApp(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return !!window.navigator.userAgent.match(/Electron/);
    }

    public get isMacOS(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return this.isElectronApp && process.platform === 'darwin';
    }

    public get isWindows(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return this.isElectronApp && process.platform === 'win32';
    }

    public get isLinux(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return this.isElectronApp && process.platform === 'linux';
    }

    public get isX86(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return this.isElectronApp && process.arch === 'ia32';
    }

    public get isX64(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }
        return this.isElectronApp && process.arch === 'x64';
    }

    public get desktopCapturer(): Electron.DesktopCapturer {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.desktopCapturer : null;
    }

    public get ipcRenderer(): Electron.IpcRenderer {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.ipcRenderer : null;
    }

    public get remote(): Electron.Remote {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.remote : null;
    }

    public get webFrame(): Electron.WebFrame {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.webFrame : null;
    }

    public get clipboard(): Electron.Clipboard {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.clipboard : null;
    }

    public get crashReporter(): Electron.CrashReporter {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.crashReporter : null;
    }

    public get process(): any {
        if (typeof window === 'undefined') {
            return;
        }
        return this.remote ? this.remote.process : null;
    }

    public get nativeImage(): typeof Electron.nativeImage {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.nativeImage : null;
    }

    /*public get screen(): Electron.Screen {
        return this.electron ? this.electron.screen : null;
    }*/

    public get shell(): Electron.Shell {
        if (typeof window === 'undefined') {
            return;
        }
        return this.electron ? this.electron.shell : null;
    }
}
