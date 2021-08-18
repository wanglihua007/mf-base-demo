import { get } from './request'

export type ScoreboardIconType = 'animal' | 'number' | 'alphabet'

export interface ListScoreboardIconsResponse {
  cssUrl: string
  catalogs: {
    catalog: ScoreboardIconType
    cover: string
    imageUrl: string
    images: string[]
    name: string
  }[]
}

export const listScoreboardIcons = get<ListScoreboardIconsResponse>(
  '/classroom/score-board-icon'
)
