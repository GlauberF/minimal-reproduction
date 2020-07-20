import { Injectable } from '@angular/core';
import { FormlyConfig } from '@ngx-formly/core';
import { TypeOption } from '@ngx-formly/core/lib/services/formly.config';

@Injectable()
export class FormlyConfigExtend extends FormlyConfig {
    getType(type: string): TypeOption {
        if (!this.types[type]) {
            return super.getType('undefined');
        }

        return super.getType(type);
    }
}
