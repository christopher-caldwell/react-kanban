import { FC, useState } from 'react'
import { Board, OnDragEndNotification, Card, moveCard, KanbanBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'

// If you want to use the library like the old one, you can do so by determining which board you want to use
export const UncontrolledBoardDemo: FC = () => {
  return (
    <>
      <Source
        title='Uncontrolled'
        url='https://github.com/christopher-caldwell/react-kanban/blob/main/demo/src/features/on-board/index.tsx'
      />
      <Board
        initialBoard={board}
        onCardRemove={({ board, card, column }) => {
          console.log({ board, card, column })
        }}
      />
    </>
  )
}

export const ControlledBoardDemo: FC = () => {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState<KanbanBoard<Card>>({ ...board })

  const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
    setBoard(currentBoard => {
      return moveCard(currentBoard, source, destination)
    })
  }

  return (
    <>
      <Source
        title='Controlled'
        url='https://github.com/christopher-caldwell/react-kanban/blob/main/demo/src/features/controlled/index.tsx'
      />
      <Board
        onCardDragEnd={handleCardMove}
        disableColumnDrag
        onCardRemove={({ board, card, column }) => {
          console.log({ board, card, column })
        }}
      >
        {controlledBoard}
      </Board>
    </>
  )
}
