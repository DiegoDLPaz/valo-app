export interface BuddieResponse {
  status: number
  data: Buddie[]
}

export interface Buddie {
  uuid: string
  displayName: string
  isHiddenIfNotOwned: boolean
  themeUuid?: string
  displayIcon: string
  assetPath: string
  levels: Level[]
}

export interface Level {
  uuid: string
  charmLevel: number
  hideIfNotOwned: boolean
  displayName: string
  displayIcon: string
  assetPath: string
}
