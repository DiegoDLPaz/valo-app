import {Component, inject, OnInit} from '@angular/core';
import {BuddiesService} from './services/buddies.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BuddieCardComponent} from './buddie-card/buddie-card.component';
import {SearchInputComponent} from '../../shared/components/search-input/search-input.component';
import {Buddie} from './interfaces/buddie-response.interface';

@Component({
  selector: 'app-buddies-page',
  imports: [
    BuddieCardComponent,
    SearchInputComponent
  ],
  templateUrl: './buddies-page.component.html'
})
export class BuddiesPageComponent implements OnInit{
  buddiesService = inject(BuddiesService)

  defaultList : Buddie[] = []

  buddiesResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.buddiesService.getAllBuddies()
    }
  })

  ngOnInit(): void {

    if(this.buddiesResource.hasValue()){
      this.defaultList = this.buddiesResource.value()
    }else{
      setTimeout(() => {
        this.ngOnInit()
      }, 50)
    }
  }

  searchByName(name:string){
    this.buddiesResource.set(this.defaultList)

    if(name){
      this.buddiesResource.set(
        this.buddiesResource.value()!.filter(buddie => buddie.displayName.toLowerCase().includes(name.toLowerCase()))
      )
    }
  }

  onChange(text: string){
    this.searchByName(text)
  }

}
