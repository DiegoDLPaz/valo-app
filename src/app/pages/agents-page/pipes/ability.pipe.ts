import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ability'
})
export class AbilityPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Ability1':
        return 'C';
      case 'Ability2':
        return 'E';
      case 'Grenade':
        return 'Q';
      case 'Ultimate':
        return 'X';
    }

    return 'Q';
  }

}
