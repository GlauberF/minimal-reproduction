import { _vimboConfig } from '@vimbo/types';

// @ts-ignore
/**
 * Default vimbo Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

// checar se esta sendo acesado de dentro de um iframe
// parent.window.parent.length
// 0 não esta dentro do iframe e diferente de 0 esta

export const vimboConfig: _vimboConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-default',
    customScrollbars: true,
    layout: {
        style: 'vertical-layout-1',
        // padrão vimbo v1
        // style: 'horizontal-layout-1',c
        width: 'fullwidth',
        navbar: {
            primaryBackground: 'vimbo-white-500',
            secondaryBackground: 'light-blue-600',
            folded: false,
            // position: 'top',
            position: 'left',
            // padrão vimbo v1
            // hidden:  !!parent.window.parent.length,
            hidden: false,
            variant: 'vertical-style-1'
        },
        toolbar: {
            background: 'light-blue-600',
            customBackgroundColor: true,
            // Padrão vimbo v1
            // hidden: !!parent.window.parent.length,
            hidden: false,
            position: 'below-static'
        },
        footer: {
            background: 'vimbo-navy-900',
            customBackgroundColor: true,
            hidden: true,
            position: 'above-fixed'
        },
        sidepanel: {
            hidden: true,
            position: 'right'
        }
    }
};
