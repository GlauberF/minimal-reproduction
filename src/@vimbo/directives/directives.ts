import { NgModule } from '@angular/core';

import { VimboIfOnDomDirective } from '@vimbo/directives/vimbo-if-on-dom/vimbo-if-on-dom.directive';
import { VimboInnerScrollDirective } from '@vimbo/directives/vimbo-inner-scroll/vimbo-inner-scroll.directive';
import { VimboPerfectScrollbarDirective } from '@vimbo/directives/vimbo-perfect-scrollbar/vimbo-perfect-scrollbar.directive';
import { VimboTranslDirective } from '@vimbo/directives/vimbo-transl/vimbo-transl.directive';
import {
    VimboMatSidenavHelperDirective,
    VimboMatSidenavTogglerDirective
} from '@vimbo/directives/vimbo-mat-sidenav/vimbo-mat-sidenav.directive';
import { VimboLongPressDirective } from '@vimbo/directives/vimbo-long-press/vimbo-long-press.directive';
import { VimboMentionDirective } from './vimbo-mention/vimbo-mention.directive';

@NgModule({
    declarations: [
        VimboIfOnDomDirective,
        VimboInnerScrollDirective,
        VimboMatSidenavHelperDirective,
        VimboMatSidenavTogglerDirective,
        VimboPerfectScrollbarDirective,
        VimboTranslDirective,
        VimboLongPressDirective,
        VimboMentionDirective
    ],
    imports: [],
    exports: [
        VimboIfOnDomDirective,
        VimboInnerScrollDirective,
        VimboMatSidenavHelperDirective,
        VimboMatSidenavTogglerDirective,
        VimboPerfectScrollbarDirective,
        VimboTranslDirective,
        VimboLongPressDirective,
        VimboMentionDirective
    ]
})
export class VimboDirectivesModule {}
