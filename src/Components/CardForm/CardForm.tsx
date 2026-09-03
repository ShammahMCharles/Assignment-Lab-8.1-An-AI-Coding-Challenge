import { useState } from 'react'
import type { Card } from '../types/index'

type CardFormProps = {
  onAddCard: (card: Card) => void
}

const CardForm = ({ onAddCard }: CardFormProps) => {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [hint, setHint] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newCard: Card = {
      id: crypto.randomUUID(),
      front: front,
      back: back,
      hint: hint,
    }

    onAddCard(newCard)

    setFront('')
    setBack('')
    setHint('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
      <div>
        <label htmlFor="front">Front</label>

        <textarea
          id="front"
          value={front}
          onChange={(event) => setFront(event.target.value)}
          placeholder="Enter your question..."
          className="block w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label htmlFor="back">Back</label>

        <textarea
          id="back"
          value={back}
          onChange={(event) => setBack(event.target.value)}
          placeholder="Enter your answer..."
          className="block w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label htmlFor="hint">Hint</label>

        <textarea
          id="hint"
          value={hint}
          onChange={(event) => setHint(event.target.value)}
          placeholder="Enter a hint..."
          className="block w-full rounded-lg border p-2"
        />
      </div>

      <button
        type="submit"
        className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Add Card
      </button>
    </form>
  )
}

export default CardForm


