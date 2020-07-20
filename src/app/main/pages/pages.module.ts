import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Module
import { LoginModule } from './authentication/login/login.module';

const routes = [];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        LoginModule
    ]
})
export class PagesModule {}
