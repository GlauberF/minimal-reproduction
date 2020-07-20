import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';

import { VIMBO_CONFIG } from '@vimbo/services/config.service';

@NgModule()
export class VimboModule {
    constructor(@Optional() @SkipSelf() parentModule: VimboModule) {
        if (parentModule) {
            throw new Error(
                'VimboModule is already loaded. Import it in the AppModule only!'
            );
        }
    }

    static forRoot(config): ModuleWithProviders<VimboModule> {
        return {
            ngModule: VimboModule,
            providers: [
                {
                    provide: VIMBO_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
