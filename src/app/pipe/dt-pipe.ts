import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dt'
})
export class DtPipe implements PipeTransform {

  transform(value: number): String {
    return value+' DT';
  }

}
