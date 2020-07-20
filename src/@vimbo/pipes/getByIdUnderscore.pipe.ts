import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getByIdUnderscore',
    pure: false
})
export class GetByIdUnderscorePipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} value
     * @param {number} _id
     * @param {string} property
     * @returns {any}
     */
    transform(value: any[], _id: number, property: string): any {
        const foundItem = value.find((item) => {
            if (item._id !== undefined) {
                return item._id === _id;
            }

            return false;
        });

        if (foundItem) {
            return foundItem[property];
        }
    }
}
