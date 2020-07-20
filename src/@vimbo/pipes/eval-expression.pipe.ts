/*
 * Eval Expression Pipe
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 2020 26/02/2020 17:22
 *
 * Example:
 * {{field | evalExpression:ArgOptional}}
 */

import { Pipe, PipeTransform } from '@angular/core';

// Core Vimbo
import { DynamicExpressionService } from '@vimbo/services/dynamic-expression.service';

@Pipe({ name: 'evalExpression' })
export class EvalExpressionPipe implements PipeTransform {
    constructor(private _dynamicExpressionService: DynamicExpressionService) {}

    /**
     * Transform
     * @param expression
     * @param arg
     * @param trigger
     * @param context
     * @param autoExecuteFunction
     */
    transform(
        expression: any,
        arg?: any,
        trigger?: any,
        context?: any,
        autoExecuteFunction?: boolean
    ): any {
        expression = this._dynamicExpressionService.evaluate(
            expression,
            arg,
            context,
            autoExecuteFunction
        );
        return expression;
    }
}
