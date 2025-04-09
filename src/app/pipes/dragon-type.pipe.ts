import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dragonType'
})
export class DragonTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "CHEMTECH_DRAGON":
        return './assets/images/Drake_Soul_Chemtech.png';
      case "ELDER_DRAGON":
        return './assets/images/Elder_DragonSquare.png';
      case "AIR_DRAGON":
        return './assets/images/Drake_Soul_Cloud.png';
      case "FIRE_DRAGON":
        return './assets/images/Drake_Soul_infernal.png';
      case "WATER_DRAGON":
        return './assets/images/Drake_Soul_Ocean.png';
      case "EARTH_DRAGON":
        return './assets/images/Drake_Soul_Mountain.png';
      case "HEXTECH_DRAGON":
        return './assets/images/Drake_Soul_Hextech.png';
    }

    return '';
  }

}
