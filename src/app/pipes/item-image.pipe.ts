import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemImage'
})
export class ItemImagePipe implements PipeTransform {

  transform(value: string | null): string {
    if (value!.endsWith('0.png')) return 'https://ddragon.leagueoflegends.com/cdn/15.6.1/img/item/7050.png';

    return value!;
  }

}
