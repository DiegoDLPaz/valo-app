// Interface for the TimelineDto response object
interface TimelineDto {
  metadata: MetadataTimeLineDto;
  info: InfoTimeLineDto;
}

// Interface for the metadata section of the TimelineDto
interface MetadataTimeLineDto {
  dataVersion: string;
  matchId: string;
  participants: string[]; // A list of participant PUUIDs
}

// Interface for the info section of the TimelineDto
interface InfoTimeLineDto {
  endOfGameResult: string;
  frameInterval: number;
  gameId: number;
  participants: ParticipantTimeLineDto[];
  frames: FramesTimeLineDto[];
}

// Interface for the participant section within the info section of the TimelineDto
interface ParticipantTimeLineDto {
  participantId: number;
  puuid: string;
}

// Interface for the frames section within the info section of the TimelineDto
interface FramesTimeLineDto {
  events: EventsTimeLineDto[];
  participantFrames: ParticipantFramesDto;
  timestamp: number;
}

// Interface for the events section within each frame in the TimelineDto
interface EventsTimeLineDto {
  timestamp: number;
  realTimestamp: number;
  type: string; // e.g., "DRAGON_KILL", "TOWER_KILL"
}

// Interface for the participantFrames section within each frame
interface ParticipantFramesDto {
  [key: number]: ParticipantFrameDto; // Key-value mapping for each participant
}

// Interface for the individual participant frame
interface ParticipantFrameDto {
  championStats: ChampionStatsDto;
  currentGold: number;
  damageStats: DamageStatsDto;
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: PositionDto;
  timeEnemySpentControlled: number;
  totalGold: number;
  xp: number;
}

// Interface for the champion stats section within a participant's frame
interface ChampionStatsDto {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPen: number;
  armorPenPercent: number;
  attackDamage: number;
  attackSpeed: number;
  bonusArmorPenPercent: number;
  bonusMagicPenPercent: number;
  ccReduction: number;
  cooldownReduction: number;
  health: number;
  healthMax: number;
  healthRegen: number;
  lifesteal: number;
  magicPen: number;
  magicPenPercent: number;
  magicResist: number;
  movementSpeed: number;
  omnivamp: number;
  physicalVamp: number;
  power: number;
  powerMax: number;
  powerRegen: number;
  spellVamp: number;
}

// Interface for the damage stats section within a participant's frame
interface DamageStatsDto {
  magicDamageDone: number;
  magicDamageDoneToChampions: number;
  magicDamageTaken: number;
  physicalDamageDone: number;
  physicalDamageDoneToChampions: number;
  physicalDamageTaken: number;
  totalDamageDone: number;
  totalDamageDoneToChampions: number;
  totalDamageTaken: number;
  trueDamageDone: number;
  trueDamageDoneToChampions: number;
  trueDamageTaken: number;
}

// Interface for the position section within a participant's frame
interface PositionDto {
  x: number;
  y: number;
}
