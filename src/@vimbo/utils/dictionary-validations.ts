/**
 * Validation Dictionary
 * contains the translated returns
 */
export class VimboDictionaryValidations {
    /**
     * Dictionary
     * @param fieldName
     * @param validatorName
     * @param language
     * @param validatorValue
     */
    static getErrorMsg(
        fieldName: string,
        validatorName: string,
        language: string = null,
        validatorValue?: any
    ): any {
        const _fieldName =
            fieldName && String(fieldName).length >= 1 ? fieldName : '';
        const _validatorValue =
            validatorValue && String(validatorValue).length >= 1
                ? validatorValue
                : '';

        // Get Language Store
        if (!language || language === 'auto') {
            if (
                window.localStorage.getItem('language') &&
                window.localStorage.getItem('language') === 'en'
            ) {
                language = 'en';
            } else {
                language = 'pt_BR';
            }
        }

        const config = {
            required:
                language === 'en'
                    ? `The field ${_fieldName} is required`
                    : `O campo ${_fieldName} é obrigatório`,
            minLength:
                language === 'en'
                    ? `The field ${_fieldName} must be at least ${_validatorValue} characters`
                    : `O campo ${_fieldName} precisa ter no mínimo ${_validatorValue} caracteres`,
            maxLength:
                language === 'en'
                    ? `The field ${_fieldName} must be at most ${_validatorValue} characters`
                    : `O campo ${_fieldName} precisa ter no máximo ${_validatorValue} caracteres`,
            max:
                language === 'en'
                    ? `The field ${_fieldName}must have a maximum value of ${_validatorValue} characters`
                    : `O campo${_fieldName} precisa ter um valor máximo de ${_validatorValue} caracteres`,
            min:
                language === 'en'
                    ? `The field ${_fieldName} must have a minimum value of ${_validatorValue}`
                    : `O campo ${_fieldName} precisa ter um valor mínimo de ${_validatorValue}`,
            email:
                language === 'en'
                    ? 'Invalid email format'
                    : 'Formato de e-mail inválido',
            cepInvalido:
                language === 'en' ? 'Invalid zip code' : 'CEP inválido',
            pattern: language === 'en' ? 'Invalid field' : 'Campo inválido',
            passwordsNotMatching:
                language === 'en'
                    ? 'Passwords must match'
                    : 'As senhas devem corresponder',
            fieldMatch:
                language === 'en'
                    ? 'Fields do not match'
                    : 'Os Campos não correspondem',
            ObjectWithValid:
                language === 'en'
                    ? `The field ${_fieldName} is required`
                    : `O campo ${_fieldName} é obrigatório`,
            'Mask error':
                language === 'en'
                    ? `Value entered for field ${_fieldName} is invalid`
                    : `Valor informado para o campo ${_fieldName} é inválido`
        };

        return config[validatorName];
    }
}
