/*
 * Simple Animated Counter Service
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 13/03/2020 14:12
 *
 * Example:
 * UtilsService.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() {}

    /**
     * Simple Animated Counter Service
     * @param start
     * @param end
     * @param operation
     * @param duration
     * @constructor
     */
    simpleAnimatedCounterService(
        start: number = 0,
        end: number = 0,
        operation: string = '-',
        duration: number = null
    ): Observable<number> {
        return new Observable<number>((observer) => {
            // Mount Interval and apply Logic
            const interval = setInterval(() => {
                // Clear
                if (start > end) {
                    console.log('---CLEAR----');
                    return clearInterval(interval);
                }

                // Operation
                if (operation === '-') {
                    observer.next(end--);
                }
                if (operation === '+') {
                    observer.next(start++);
                }

                console.log(`Counter ${end + 1}`);
            }, duration || 1000);
        });
    }
}
