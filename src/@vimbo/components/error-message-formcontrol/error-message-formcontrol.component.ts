/*
 * Vimbo Error Message Form Control Component
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 26/12/2019 15:29
 *
 * Example:
 * <vimbo-error-message-formcontrol></vimbo-error-message-formcontrol>
 */

import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VimboDictionaryValidations } from '@vimbo/utils/dictionary-validations';
import { TranslateService } from '@ngx-translate/core';

let nextUniqueId = 0;

@Component({
    selector: 'vimbo-error-message-formcontrol',
    templateUrl: './error-message-formcontrol.component.html',
    styleUrls: ['./error-message-formcontrol.component.scss']
})
export class VimboErrorMessageFormcontrolComponent implements OnInit {
    @Input() control: FormControl;
    @Input() textOnly: boolean;
    @Input() label: string;
    @Input('hideButtonClose')
    @HostBinding('attr.role')
    role = alert;
    @HostBinding('attr.id')
    id = `vimbo-error-message-formcontrol-${nextUniqueId++}`;
    hideButtonClose: boolean;

    private currentLanguage: string;

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.currentLanguage = this.translate.currentLang;
    }

    get errorMessage(): any {
        for (const propertyName in this.control.errors) {
            if (
                this.control.errors.hasOwnProperty(propertyName) &&
                this.control.touched
            ) {
                return VimboDictionaryValidations.getErrorMsg(
                    this.label,
                    propertyName,
                    this.currentLanguage,
                    this.control.errors[propertyName].requiredLength ||
                        this.control.errors[propertyName].max
                );
            }
        }

        return;
    }
}
