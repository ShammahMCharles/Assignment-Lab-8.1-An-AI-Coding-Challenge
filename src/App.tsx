import FlashCard from './Components/FlashCard/FlashCard.tsx'
import CardForm from './Components/CardForm/CardForm.tsx'

import { BookOpen, Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import type { Card, Deck } from './Components/types/index.tsx'

function App() {
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: 'general-knowledge',
      name: 'General Knowledge',
      cards: [
        {
          id: '1',
          front: 'What is the capital of France?',
          back: 'Paris',
          hint: 'It is the city of light.',
        },
      ],
    },
  ])
  const [activeDeckId, setActiveDeckId] = useState('general-knowledge')
  const [newDeckName, setNewDeckName] = useState('')

  const activeDeck = decks.find((deck) => deck.id === activeDeckId) ?? decks[0]

  const handleAddCard = (newCard: Card) => {
    setDecks((currentDecks) =>
      currentDecks.map((deck) =>
        deck.id === activeDeck.id
          ? { ...deck, cards: [...deck.cards, newCard] }
          : deck,
      ),
    )
  }

  const handleCreateDeck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = newDeckName.trim()

    if (!name) return

    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name,
      cards: [],
    }

    setDecks((currentDecks) => [...currentDecks, newDeck])
    setActiveDeckId(newDeck.id)
    setNewDeckName('')
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-700 uppercase">
              <BookOpen size={16} />
              Study space
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Flash Cards</h1>
            <p className="mt-2 text-slate-600">Organize your questions into focused decks.</p>
          </div>

          <form onSubmit={handleCreateDeck} className="flex w-full gap-2 sm:w-auto">
            <label htmlFor="new-deck-name" className="sr-only">New deck name</label>
            <input
              id="new-deck-name"
              value={newDeckName}
              onChange={(event) => setNewDeckName(event.target.value)}
              placeholder="Name a new deck"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:w-52"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              <Plus size={17} />
              New deck
            </button>
          </form>
        </header>

        <nav aria-label="Flash card decks" className="mb-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-px">
          {decks.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => setActiveDeckId(deck.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-left transition-colors ${
                deck.id === activeDeck.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="block font-semibold">{deck.name}</span>
              <span className="text-xs text-slate-500">
                {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
              </span>
            </button>
          ))}
        </nav>

        <section aria-labelledby="active-deck-heading">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 id="active-deck-heading" className="text-2xl font-bold">{activeDeck.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Add cards to this deck and click one to flip it.</p>
            </div>
          </div>

          <CardForm onAddCard={handleAddCard} />

          {activeDeck.cards.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {activeDeck.cards.map((card) => (
                <FlashCard key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
              This deck is empty. Add your first flash card above.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App