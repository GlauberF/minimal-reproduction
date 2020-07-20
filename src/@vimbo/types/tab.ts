/*
 * @description
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 31/10/2019 18:19
 */

import { FormlyFieldConfig } from '@ngx-formly/core';

export interface VimboTab {
    label: string;
    disabled?: boolean;
    fields: FormlyFieldConfig[];
}
