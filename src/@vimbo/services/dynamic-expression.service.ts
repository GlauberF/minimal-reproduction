/*
 * Eval Expression
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 26/02/2020 17:22
 *
 * NOTE:
 * Implement the library in the future (https://github.com/TomFrost/Jexl)
 * it has only 12.6kB and if it is compressed only 3.7kB.
 * - It is more dry the way we are doing, using native
 * eval (https://github.com/TomFrost/Jexl/issues/81)
 *
 * After several performance tests
 * (https://jsben.ch/KaM4t),
 * (https://jsperf.com/benchmark-eval-new-function-and-function-w-eval/1),
 * the use of function with eval is the most performance option.
 *
 */

import { Injectable } from '@angular/core';

// Core Vimbo
import { VimboCheckDataTypes } from '@vimbo/utils/check-data-types';
import { VimboUtils } from '@vimbo/utils';

@Injectable({
    providedIn: 'root'
})
export class DynamicExpressionService {
    private _blacklistWords: string[];

    constructor() {
        this._initBlacklist();
    }

    /**
     * Evaluate
     * @param expression
     * @param arg
     * @param context
     * @param autoExecuteFunction
     */
    evaluate(
        expression: any,
        arg?: any,
        context?: any,
        autoExecuteFunction?: boolean
    ): any {
        const _autoExecuteFunction =
            !autoExecuteFunction && autoExecuteFunction !== false;

        try {
            /**
             * Check Blacklist Words
             */
            for (const blw of this._blacklistWords) {
                if (String(expression).indexOf(blw) !== -1) {
                    console.warn(
                        `Attention - that word (${blw}) is on our blacklist!`
                    );
                    return expression;
                }
            }

            /**
             * Is Boolean
             */
            if (typeof expression === 'boolean') {
                return expression;
            }

            /**
             * Is Function
             */
            if (expression instanceof Function) {
                return arg ? expression(arg) : expression();
            } else if (typeof expression === 'string') {
                /**
                 * Is String
                 */
                /**
                 * Is Boolean
                 */
                if (
                    new RegExp(/^true$/).test(expression) ||
                    new RegExp(/^false$/).test(expression)
                ) {
                    // tslint:disable-next-line
                    // expression = eval(expression);

                    // tslint:disable-next-line
                    expression = function (str: string) {
                        // tslint:disable-next-line
                        return eval(str);
                    }.call(context, expression);
                    return expression;
                }

                /**
                 * is function, return
                 * considered function, ex:
                 * (any) =>, () =>, (any)=>,
                 * ()=>, data=>, data =>,
                 * data=>, data =>,
                 * function(){}, function (any) {}
                 *
                 */
                if (
                    new RegExp(
                        /(^\((.*?)\)(\s)*?(\=\>))|([function](\s)*?(.*?)((.*?)\))(\s)*?(\{))|(^([a-z]|[A-Z])+?(\s)*?(\=\>))/gm
                    ).test(expression)
                ) {
                    // tslint:disable-next-line
                    expression = function (str: string) {
                        // tslint:disable-next-line
                        return eval(str);
                    }.call(context, expression);

                    // tslint:disable-next-line
                    // expression = eval(expression)

                    // check for guarantee if the instanceof is function
                    if (expression instanceof Function) {
                        if (_autoExecuteFunction) {
                            expression = arg ? expression(arg) : expression();
                            return expression;
                        }

                        return expression;
                    }

                    return expression;
                }

                /**
                 * Others
                 */
                return expression;
            }

            /**
             * Others
             */
            return expression;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Evaluate Structure
     * @param expression
     * @param context
     */
    evaluateStructure(expression: any, context?: any): any {
        if (!expression) {
            return;
        }

        if (typeof expression !== 'string') {
            return expression;
        }

        try {
            // tslint:disable-next-line
            return function (str: string) {
                // console.log('this inside', this)
                // tslint:disable-next-line
                return eval(str);
            }.call(context, expression);

            // return expression;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Add Words To Blacklist
     * @param data
     */
    addWordsToBlacklist(data: string | string[]): void {
        if (!data) {
            return;
        }

        // Is Array
        if (VimboCheckDataTypes.check(data).isArray) {
            (data as Array<string>).forEach((element) => {
                // Add the word if it doesn't already exist in the array
                VimboUtils.addInArray(this._blacklistWords, element);
            });
        }
        // Is String
        else {
            // Add the word if it doesn't already exist in the array
            VimboUtils.addInArray(this._blacklistWords, data as string);
        }
    }

    /**
     * Init Blacklist
     * @private
     */
    private _initBlacklist(): void {
        this._blacklistWords = [
            'createElement(',
            'appendChild',
            'append',
            'innerHTML',
            '<script',
            'require',
            'import',
            'createTextNode'
        ];
    }
}
