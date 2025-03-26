import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankedType'
})
export class RankedTypePipe implements PipeTransform {

  transform(value: string): string {
    if(value === "RANKED_SOLO_5x5"){
      return "RANKED SOLO/DUO"
    }

    return "RANKED FLEX";
  }

}
