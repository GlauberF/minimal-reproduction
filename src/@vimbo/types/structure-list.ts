/*
 * @description Structure List
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 21/12/2019 14:13
 */

import { Hotkey } from 'angular2-hotkeys';

// Core Vimbo
// import { InterfaceTemplateOptions } from '@vimbo/components/table/interfaces/table-template-options';

/**
 * Structure List
 */
export interface StructureList {
    desktop: StructureListItem[];
    mobile: StructureListItem[];
    // Keyboard Shortcuts
    'keyboardShortcuts'?: Hotkey | Hotkey[];
}

/**
 * Structure List Item
 */
export interface StructureListItem {
    _id: string;
    key: string;
    label: string;
    type: ConfigTypes;
    // templateOptions?: InterfaceTemplateOptions;
}

/**
 * Types
 * for new types register here and
 * add inside table / content-per-type the new component (content type)
 */
export enum EnumTypesStructureList {
    'text',
    'date',
    'mask',
    'nested-value',
    'vimbo-badge',
    'content-by-expression',
    'content-tree',
    'array',
    'component'
}

/**
 * Config Types
 *
 * @key is the type name in the above enum
 * @extraConfiguration can be used as a dynamic object, for use on other types
 * that depend on more arguments like configuration, class etc ...
 */
export interface ConfigTypes {
    key: keyof typeof EnumTypesStructureList;
    extraConfiguration?: {
        [k: string]: any;
    };
}
