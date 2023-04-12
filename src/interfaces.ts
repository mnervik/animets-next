// Common types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type General = {
  id: number
  name: string
}

// Other Types
type Related = {
  id: number
  name: string
  image: string | null
  plays: number
}

export type Video = {
  id: number
  name: string
  franchise: string
  studio: string | null
  episode: number
  duration: number
  attributes: Attribute[]
  path: { file: string; stream: string }
  date: { added: string; published: string | null }
  quality: number
  related: Related
}

export type Attribute = General
export type Category = General

export type VideoStar = {
  id: number
  name: string
  image: string | null
  attributes: Attribute[]
}

export type Bookmark = {
  id: number
  name: string
  starImage?: string
  starId: number
  start: number
  active: boolean
  attributes: Attribute[]
}
