import { FC, useState } from 'react'
import { ControlledBoard, OnDragEndNotification, Card, moveCard, KanbanBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'

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
      <ControlledBoard
        onCardDragEnd={handleCardMove}
        disableColumnDrag
        onCardRemove={({ board, card, column }) => {
          console.log({ board, card, column })
        }}
        allowRenameColumn
        onColumnRename={({ board, column }) => {
          setBoard(board)
          window.alert(`Column renamed to ${column.title}`)
        }}
      >
        {controlledBoard}
      </ControlledBoard>
    </>
  )
}
