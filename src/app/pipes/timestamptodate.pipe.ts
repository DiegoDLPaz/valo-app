import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestamptodatePipe implements PipeTransform {

  transform(value: number | null): string {
    if (value === null || value === undefined) return '';
    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
