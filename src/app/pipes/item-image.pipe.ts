import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemImage'
})
export class ItemImagePipe implements PipeTransform {

  transform(value: string | null): string {
    if (value!.endsWith('0.png')) return './assets/images/no-item-image.png';

    return value!;
  }

}
