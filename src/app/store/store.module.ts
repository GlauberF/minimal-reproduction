import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import {
    RouterStateSerializer,
    StoreRouterConnectingModule,
    DefaultRouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '@env/environment';
import { reducers, effects, CustomSerializer } from 'app/store';

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? []
    : [];

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot({
            serializer: DefaultRouterStateSerializer
        })
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        }
    ]
})
export class AppStoreModule {}
