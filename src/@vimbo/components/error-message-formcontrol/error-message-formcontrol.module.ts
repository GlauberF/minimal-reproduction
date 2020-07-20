import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VimboErrorMessageFormcontrolComponent } from './error-message-formcontrol.component';
import { VimboMessageBoxesModule } from '@vimbo/components/message-boxes/message-boxes.module';

@NgModule({
    declarations: [VimboErrorMessageFormcontrolComponent],
    imports: [CommonModule, VimboMessageBoxesModule],
    exports: [VimboErrorMessageFormcontrolComponent]
})
export class VimboErrorMessageFormcontrolModule {}
