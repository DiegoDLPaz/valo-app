import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameType'
})
export class GameTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 440:
        return 'RANKED FLEX';
      case 450:
        return 'ARAM';
      case 420:
        return 'RANKED SOLO/DUO';
      case 400:
        return 'NORMAL';
      case 900:
        return 'URF';
    }

    return value.toString();
  }

}
