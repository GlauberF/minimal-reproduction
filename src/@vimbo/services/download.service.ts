import { Injectable } from '@angular/core';

// Core Vimbo
import { OtherSharedApiService } from '@vimbo/services/other-shared-api.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    /**
     * Constructor
     * @param _otherSharedApiService
     */
    constructor(private _otherSharedApiService: OtherSharedApiService) {}

    /**
     * Download a string
     * @param data
     * @param strFileName
     * @param strMimeType
     */
    string(
        data: string,
        strFileName: string,
        strMimeType: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const blob = new Blob([data], { type: strMimeType });
            const a = document.createElement('a');
            a.download = strFileName;
            a.href = URL.createObjectURL(blob);
            a.dataset.downloadurl = [strMimeType, a.download, a.href].join(':');
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => {
                URL.revokeObjectURL(a.href);
            }, 1500);

            resolve('ok');
        });
    }

    /**
     * Download a url
     */
    url(url: string, strFileName: string, strMimeType: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._otherSharedApiService
                .getContentFileURL(url)
                .then((res: any) => {
                    if (!res.erro && res.mensagem) {
                        this.string(res.mensagem, strFileName, strMimeType);
                    } else {
                        reject(res.erro);
                    }
                })
                .catch((er) => {
                    reject(er);
                });
        });
    }

    /**
     * Download a blob
     */
    blob(): void {
        console.log('not implemented!');
    }

    // https://github.com/rndme/download/blob/master/download.js
}
