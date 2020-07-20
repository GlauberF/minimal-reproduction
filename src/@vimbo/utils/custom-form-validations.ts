import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class VimboCustomFormValidations {
    /**
     * Válida CEP
     * @param control
     */
    static cepValidator(control: FormControl): any {
        const cep = control.value;
        if (cep && cep !== '') {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }
        return;
    }

    /**
     * Confirm password validator
     *
     * @param {AbstractControl} control
     * @returns {ValidationErrors | null}
     */
    static confirmPasswordValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        if (!control.parent || !control) {
            return;
        }

        const password = control.parent.get('password');
        const passwordConfirm = control.parent.get('passwordConfirm');

        if (!password || !passwordConfirm) {
            return;
        }

        if (passwordConfirm.value === '') {
            return;
        }

        if (password.value === passwordConfirm.value) {
            return;
        }

        return { passwordsNotMatching: true };
    };
}
