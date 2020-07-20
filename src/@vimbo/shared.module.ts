import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { VimboDirectivesModule } from '@vimbo/directives/directives';
import { VimboPipesModule } from '@vimbo/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        VimboDirectivesModule,
        VimboPipesModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        VimboDirectivesModule,
        VimboPipesModule
    ]
})
export class VimboSharedModule {}
