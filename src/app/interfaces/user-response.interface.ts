export interface LeagueUserResponse {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  puuid: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export interface RiotUserResponse{
  gameName: string
  puuid: string
  tagLine: string
}
