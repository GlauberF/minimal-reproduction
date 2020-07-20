import { NgModule } from '@angular/core';
import { VimboNotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { VimboPipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, MatButtonModule, RouterModule, VimboPipesModule],
    declarations: [VimboNotificationComponent],
    exports: [VimboNotificationComponent]
})
export class NotificationModule {}
