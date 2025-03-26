import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goldGained'
})
export class GoldGainedPipe implements PipeTransform {

  transform(value: number): string {
    return `${Math.floor(value/1000)}K`;
  }

}
