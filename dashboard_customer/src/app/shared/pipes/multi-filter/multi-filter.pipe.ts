import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiFilter',
  pure: false
})
@Injectable()
export class MultiFilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
    if(!filter) return items;
    return items.filter(item => {
      const notMatchingField = Object.keys(filter)
        .find(key => item[key].toString().toLowerCase().indexOf(filter[key].toString().toLowerCase()) === -1 );

      return !notMatchingField; // true if matches all fields
    });
  }
}
