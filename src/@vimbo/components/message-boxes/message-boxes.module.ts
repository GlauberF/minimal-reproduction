import { NgModule } from '@angular/core';
import { VimboMessageBoxesComponent } from './message-boxes.component';
import { VimboDirectivesModule } from '../../directives/directives';
import { CommonModule } from '@angular/common';
import { VimboPipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [VimboMessageBoxesComponent],
    imports: [VimboDirectivesModule, CommonModule, VimboPipesModule],
    exports: [VimboMessageBoxesComponent]
})
export class VimboMessageBoxesModule {}
