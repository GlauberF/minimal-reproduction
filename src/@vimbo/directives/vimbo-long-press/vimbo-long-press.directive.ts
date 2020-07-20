/*
 * Vimbo Long Press
 * Sometimes you need a button to only activate after a certain duration OR
 * you need a button to continuously emit ‘click’ events as a user holds
 * down the button.
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2019 27/12/2019 09:00
 *
 */

import {
    Directive,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({ selector: '[vimboLongPress]' })
export class VimboLongPressDirective {
    // 500
    @Input() duration = 100;

    @Output() longPressEmitter: EventEmitter<any> = new EventEmitter();
    @Output() longPressingEmitter: EventEmitter<any> = new EventEmitter();
    @Output() longPressEndEmitter: EventEmitter<any> = new EventEmitter();

    private pressing: boolean;
    private longPressing: boolean;
    private timeout: any;
    private mouseX = 0;
    private mouseY = 0;

    @HostBinding('class.press')
    get press(): any {
        return this.pressing;
    }

    @HostBinding('class.longpress')
    get longPress(): any {
        return this.longPressing;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event): void {
        // don't do right/middle clicks
        if (event.which !== 1) {
            return;
        }

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

        this.pressing = true;
        this.longPressing = false;

        this.timeout = setTimeout(() => {
            this.longPressing = true;
            this.longPressEmitter.emit(event);
            this.loop(event);
        }, this.duration);

        this.loop(event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event): void {
        if (this.pressing && !this.longPressing) {
            const xThres = event.clientX - this.mouseX > 10;
            const yThres = event.clientY - this.mouseY > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }

    loop(event): void {
        if (this.longPressing) {
            this.timeout = setTimeout(() => {
                this.longPressingEmitter.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress(): void {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.longPressEndEmitter.emit(true);
    }

    @HostListener('mouseup')
    onMouseUp(): void {
        this.endPress();
    }
}
