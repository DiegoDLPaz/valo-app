import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePlayed'
})
export class TimePlayedPipe implements PipeTransform {

  transform(value: number): string {

    const minutes =  Math.floor(value/60)
    const seconds = value%60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

}
