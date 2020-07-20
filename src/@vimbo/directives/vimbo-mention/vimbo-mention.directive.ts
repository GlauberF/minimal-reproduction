/*
 * Vimbo Mention
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 23/01/2020 10:28
 *
 * lib used: https://github.com/zurb/tribute
 * based on: https://github.com/ladderio/ngx-tribute
 *
 * Example
 * <input [vimboMention]="options">
 * <textarea [vimboMention]="options"></textarea>
 *
 */

import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    OnDestroy
} from '@angular/core';
import {
    FormControl,
    FormControlDirective,
    FormControlName,
    NgModel
} from '@angular/forms';
import Tribute, { TributeCollection, TributeOptions } from 'tributejs';

@Directive({
    selector: '[vimboMention]',
    exportAs: 'vimbo-mention'
})
export class VimboMentionDirective<T> implements OnInit, OnDestroy {
    @Input('vimboMention')
    options: TributeOptions<T>;

    @Input()
    menuContainer: HTMLElement;

    @Input()
    implicitFormControl: FormControl;

    @Output()
    outputMentioned = new EventEmitter<string>();

    @Output()
    outputMentionItemSelected = new EventEmitter<any>();

    tribute: Tribute<T>;

    constructor(
        private element: ElementRef,
        @Optional() private formControlName: FormControlName,
        @Optional() private formControlDirective: FormControlDirective,
        @Optional() private ngModelDirective: NgModel
    ) {}

    get control(): FormControl {
        return (
            this.implicitFormControl ||
            (this.formControlName && this.formControlName.control) ||
            (this.formControlDirective && this.formControlDirective.control) ||
            (this.ngModelDirective && this.ngModelDirective.control)
        );
    }

    ngOnInit(): void {
        // Is Server
        if (typeof window === 'undefined') {
            return;
        }

        const options: TributeOptions<T> = { ...this.options };

        if (this.menuContainer) {
            (options as TributeCollection<
                T
            >).menuContainer = this.menuContainer;
        }

        this.tribute = new Tribute(options);
        this.tribute.attach(this.element.nativeElement);

        this.element.nativeElement.addEventListener(
            'tribute-replaced',
            (event) => {
                const value = ['INPUT', 'TEXTAREA'].includes(
                    this.element.nativeElement.tagName
                )
                    ? this.element.nativeElement.value
                    : this.element.nativeElement.innerHTML;

                this.outputMentioned.emit(value);
                this.outputMentionItemSelected.emit(event.detail.item.original);

                if (this.control) {
                    this.control.setValue(value);
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.tribute) {
            this.tribute.detach(this.element.nativeElement);
        }
    }
}
