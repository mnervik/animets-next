// Common types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type General = {
  id: number
  name: string
}

// Other Types
