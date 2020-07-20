/*
 * Dynamic Component Interface
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) Vimbo Tecnologia LTDA ME
 * @link  https://www.vimbo.com.br/
 * @data 27/05/2020 06:28
 */

export interface DynamicComponentInterface {
    _id?: string | number;
    evaluate?: boolean;
    component: {
        path: string;
        name: string;
        declaration: string;
    };
    cpn?: any;
    inputs?: {
        [key: string]: string;
    } | null;
    outputs?: {
        [key: string]: string;
    } | null;
}
