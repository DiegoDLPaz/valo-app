import {Component, effect, input, linkedSignal, output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})

export class SearchInputComponent {
  placeHolder = input<string>('Buscar')
  initialValue = input<string>();
  value = output<string>()


  inputValue= linkedSignal<string>(() => this.initialValue() ?? '')

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() =>{
      this.value.emit(value)
    }, 1000)

    onCleanup(() =>{
      clearTimeout(timeout)
    })
  })
}
