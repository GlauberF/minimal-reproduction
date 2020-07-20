/*
 * Vimbo Confirm Dialog
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:24
 *
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'vimbo-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class VimboConfirmDialogComponent {
    public confirmMessage: string;
    public titleMessage: string;
    public hiddenButtons: boolean;
    public buttonConfirm: {
        label: string;
        hidden: boolean;
    };
    public buttonClose: {
        label: string;
        hidden: boolean;
    };

    /**
     * Constructor
     *
     * @param {MatDialogRef<VimboConfirmDialogComponent>} dialogRef
     * @param _data
     */
    constructor(
        public dialogRef: MatDialogRef<VimboConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        this.confirmMessage = _data.confirmMessage || '';
        this.titleMessage = _data.titleMessage || '';
        this.hiddenButtons = _data.hiddenButtons || false;
        this.buttonConfirm = _data.buttonConfirm || {
            label: 'Sim',
            hidden: false
        };
        this.buttonClose = _data.buttonClose || {
            label: 'Não',
            hidden: false
        };
    }
}
