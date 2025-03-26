import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'victory'
})
export class VictoryPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value){
      return "Victoria"
    }
    return "Derrota";
  }

}
