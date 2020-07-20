/*
 * @description Structure Details
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 31/10/2019 18:17
 */

import { FormlyFieldConfig } from '@ngx-formly/core';
import { Hotkey } from 'angular2-hotkeys';

// Core Vimbo
import { VimboTab } from '@vimbo/types/tab';

export interface StructureDetails {
    // Action buttons, are in the header
    'actionsButton'?: any[];
    // Tabs and their fields
    'tabs'?: VimboTab[];
    // If you are not going to use tabs, go directly to the fields inside
    'fields'?: FormlyFieldConfig[];
    // Additional content
    'additional'?: any;
    // Keyboard Shortcuts
    'keyboardShortcuts'?: Hotkey | Hotkey[];
}
