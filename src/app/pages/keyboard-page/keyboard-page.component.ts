import {Component, HostListener} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-keyboard-page',
  imports: [
    NgClass
  ],
  templateUrl: './keyboard-page.component.html'
})
export class KeyboardPageComponent {
  keys0 = ['º','1', '2', '3', '4', '5', '6', '7', '8', '9', '0','\'','¡','DEL']
  keys1 = ['Tab','q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p','\`','+','Enter']
  keys2 = ['Mayus','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l','ñ','\´','ç']
  keys3 = ['Shift','<','z', 'x', 'c', 'v', 'b', 'n', 'm', ',','.','-']

  pressedKeys: { [key: string]: boolean } = {};

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    if (this.keys0.includes(event.key) || this.keys1.includes(event.key) || this.keys2.includes(event.key) || this.keys3.includes(event.key)) {
      this.pressedKeys[event.key] = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.keys0.includes(event.key) || this.keys1.includes(event.key) || this.keys2.includes(event.key) || this.keys3.includes(event.key)) {
      this.pressedKeys[event.key] = false;
    }
  }
}
