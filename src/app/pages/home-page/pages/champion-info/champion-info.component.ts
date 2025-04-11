import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LeagueService} from '../../../../services/league.service';

@Component({
  selector: 'app-champion-info',
  imports: [],
  templateUrl: './champion-info.component.html'
})

export class ChampionInfoComponent implements OnInit{
  @ViewChild('queue') queueSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('tier') tierSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('division') divisionSelect!: ElementRef<HTMLSelectElement>;


  http = inject(HttpClient)
  leagueService = inject(LeagueService)

  ngOnInit(): void {
    setTimeout(() => {
      const queue = this.queueSelect.nativeElement.value;
      const tier = this.tierSelect.nativeElement.value;
      const division = this.divisionSelect.nativeElement.value;

      this.onSelectChanged(queue, tier, division);
    });
  }

  onSelectChanged(queue:string,tier:string, division:string){
    this.leagueService.getRankInfo(queue,tier,division)
  }

}
