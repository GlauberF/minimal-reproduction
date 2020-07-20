/*
 * @description Interface for General Settings
 *
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 02/11/2019 17:57
 */

export interface GeneralSettingsInterface {
    [key: string]: GeneralSettingsItemInterface[];
}

export interface GeneralSettingsItemInterface {
    _id: string;
    title: string;
    hidden: boolean;
    // hidden: () => Promise<boolean> | boolean;
    description?: string;
    path: string;
}
