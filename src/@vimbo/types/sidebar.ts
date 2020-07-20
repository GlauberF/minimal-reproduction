/*
 * @description Interface for Sidebar Vimbo
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 */

import { DynamicComponentInterface } from '@vimbo/components/dynamic-component/dynamic-component-type';

export interface SidebarInterface {
    [key: string]: SidebarItemInterface[];
}

export interface SidebarItemInterface {
    _id: string;
    title: string;
    icon?: string;
    tagRenderIcon?: 'i' | 'mat-icon' | 'mat-icon-svg';
    url: string;
    color?: string;
    badge?: number;
    badgeClass?: string;
    dynamicComponent?: DynamicComponentInterface[];
}
