import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankImages'
})
export class RankImagesPipe implements PipeTransform {

  transform(value: string): string {

    switch (value){
      case 'IRON':
        return './assets/images/iron.png'
      case 'BRONZE':
        return './assets/images/bronze.png'
      case 'SILVER':
        return './assets/images/silver.png'
      case 'GOLD':
        return './assets/images/gold.png'
      case 'PLATINUM':
        return './assets/images/platinum.png'
      case 'EMERALD':
        return './assets/images/emeraldjfif.jfif'
      case 'DIAMOND':
        return './assets/images/diamond.png'
      case 'MASTER':
        return './assets/images/master.png'
      case 'GRANDMASTER':
        return './assets/images/GrandMaster.png'
      default:
        return './assets/images/challenger.png'
    }

  }

}
