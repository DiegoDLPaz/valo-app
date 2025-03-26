import {Component, inject, signal} from '@angular/core';
import {LeagueUserResponse} from '../../interfaces/user-response.interface';
import {LeagueService} from '../../services/league.service';

const ctnlPuuids = [
  "Feox5FQE_ZBHZrjVdx1BoF-65xKEHaehwwqjyiVQP0XNFfR80D9U4Z0d8yd16fRMhjLXWL7U6s9DZA",
  "O-E3PLH9SROfSSsC3xxLsFgCLPpdpen7AzgcStBBJM7yKYiYkLU9lmh-LjgrTUA7LYENE9KovgqOdA",
  "qSEnjVrXWKFztDTxrHt_pOzR00hL80a3ZfPnew51qPG326yHMuAoJay3ZZA_LyTCKe6Sg1JofmdwaQ",
  "llI107_DM7D045YRAmCyVuJnARivQZmSYjK6q_YfdqRkhRhdZ3MRdWWmXOXInZHLy42_cbBKgthKeA",
  "IkSoADDAcTDwDDfmZIJqkBWMYET8YxayLoiG-n13d38Xl3HkQ6_V2q8UObJOnJn_A_2cyLC53rdSgw",
  "xm_Az_-nlmgpAcc0c--tvY7MgDgjVMlmzysMP5aYU3CHZnWFCoEjisNbyM7xqRrshUv3WD4Vz80Ktw"
]

@Component({
  selector: 'app-ctnl-page',
  imports: [],
  templateUrl: './ctnl-page.component.html'
})

export class CtnlPageComponent {
  private leagueService = inject(LeagueService)

  ctnlUsers = signal<LeagueUserResponse[][]>([[]])

  constructor() {

    ctnlPuuids.forEach((puuid) => {
      this.leagueService.getUserByPuuid(puuid).subscribe(
        resp =>
          this.ctnlUsers.set([...this.ctnlUsers(),resp])
      )
    })

  }

  showCtnlUsers(){
    this.ctnlUsers().forEach(user =>{
      console.log({user})
    })
  }

}
