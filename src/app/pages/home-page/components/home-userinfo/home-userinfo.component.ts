import {Component, input} from '@angular/core';
import {LeagueUserResponse} from '@interfaces/user-response.interface';
import {RankImagesPipe} from '@pipes/rank-images.pipe';
import {ChartData} from 'chart.js';
import {RankedTypePipe} from '@pipes/ranked-type.pipe';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'home-userinfo',
  imports: [
    RankImagesPipe,
    RankedTypePipe,
    BaseChartDirective
  ],
  templateUrl: './home-userinfo.component.html'
})

export class HomeUserinfoComponent {

  userInfo = input.required<LeagueUserResponse>()

  setChartData(wins:number, loses:number): ChartData<'doughnut'>{
    return {
      datasets: [
        {
          data: [wins, loses],
          backgroundColor: ['#4ade80', '#f87171'],
          hoverBackgroundColor: ['#22c55e', '#ef4444'],
        }
      ]
    };
  }
}
