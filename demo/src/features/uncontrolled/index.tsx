import { FC } from 'react'
import { UncontrolledBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'

export const UncontrolledBoardDemo: FC = () => {
  return (
    <>
      <Source
        title='Uncontrolled'
        url='https://github.com/christopher-caldwell/react-kanban/blob/main/demo/src/features/uncontrolled/index.tsx'
      />
      <UncontrolledBoard
        initialBoard={board}
        onCardRemove={({ board, card, column }) => {
          console.log({ board, card, column })
        }}
        onCardDragEnd={(subjectCustomCard, source, destination) => {
          console.log({
            subjectCustomCard,
            source,
            destination
          })
        }}
      />
    </>
  )
}
