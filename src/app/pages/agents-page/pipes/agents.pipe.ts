import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agents'
})
export class AgentsPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value){
      return 'Si';
    }

    return 'No';
  }

}
