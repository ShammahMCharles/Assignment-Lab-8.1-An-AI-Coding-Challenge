import type { Card } from '../types'
import clsx from 'clsx'
import { ClipboardList, HelpCircle, Lightbulb } from 'lucide-react'
import { useState } from 'react'

type FlashCardProps = {
  card: Card
}

export const FlashCard = ({ card }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  

const handleCardClick = () => {
  setIsFlipped((prev) => !prev)

  console.log('Card flipped!', {
    front: card.front,
    back: card.back,
  })
}

  return (
    <div
      onClick={handleCardClick}
      className={clsx(
        'relative h-42.5 w-105 cursor-pointer rounded-2xl border border-gray-200 bg-transparent shadow-md transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]',
        {
          '[&_.card-content]:rotate-y-180': isFlipped,
        },
      )}
    >
      {/* Flip badge */}
      <div className="absolute top-2 right-2 z-10 rounded-full bg-[#0b5599] px-2 py-0.5 text-xs font-medium text-white shadow">
        Click to Flip
      </div>

      <div className="card-content h-full w-full transition-transform duration-500 transform-3d">
        {/* Front Side */}
        <div className="card-front absolute h-full w-full rounded-2xl bg-linear-to-br from-[#f0f4f8] to-[#e2ebf3] p-4 text-gray-800 backface-hidden">
          <h3 className="mb-2 flex items-center gap-1 text-xl font-bold text-[#0b5599]">
            <HelpCircle size={18} />
            Question
          </h3>
          <p className="text-base leading-relaxed font-medium">{card.front}</p>

          <div className="mt-4 flex items-center gap-2">
            <Lightbulb size={18} color="orange" />
            <p className="text-sm text-gray-600 italic">{card.hint}</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back absolute h-full w-full rotate-y-180 rounded-2xl bg-linear-to-br from-[#e1f4f0] to-[#ebf0ee] p-4 text-gray-800 shadow-lg backface-hidden">
          <h3 className="mb-2 flex items-center gap-1 text-2xl font-bold text-[#0b5599] drop-shadow-sm">
            <ClipboardList size={20} />
            Answer
          </h3>
          <pre className="rounded-md border border-[#0b5599] bg-white p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 shadow-lg">
            {card.back}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default FlashCard