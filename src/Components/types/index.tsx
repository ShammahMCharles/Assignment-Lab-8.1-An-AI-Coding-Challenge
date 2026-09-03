export type Card = {
  id: string
  front: string
  back: string
  hint?: string
}

export type Deck = {
  id: string
  name: string
  cards: Card[]
}

