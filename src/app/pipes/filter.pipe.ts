import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], query: string): any[] {
    if (!items || !items.length) {
        return [];
    }

    if (!query || query.length < 2) {
        return items;
    }

    const result = items.filter(i => {
      return i.toLowerCase().includes(query.toLowerCase());
    });

    return result;
  }
}
