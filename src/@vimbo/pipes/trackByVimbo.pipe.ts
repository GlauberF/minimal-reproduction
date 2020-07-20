import { Pipe, PipeTransform } from '@angular/core';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
interface TrackByFunctionCache {
    [propertyName: string]: <T>(index: number, item: T) => any;
}

const cache: TrackByFunctionCache = Object.create(null);

@Pipe({
    name: 'trackByVimbo',
    pure: true
})
export class TrackByVimboPipe implements PipeTransform {
    /**
     * I return a TrackBy function that plucks the given property from the ngFor item.
     * @param propertyName
     */
    public transform(propertyName: string): any {
        // Ensure cached function exists.
        if (!cache[propertyName]) {
            cache[propertyName] = function trackByVimbo<T>(
                index: number,
                item: T
            ): any {
                // console.log(item)
                return item[propertyName];
            };
        }

        return cache[propertyName];
    }
}
