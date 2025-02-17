import { useState } from 'react'

import { ColumnAdder } from '@/features/column-adder'
import { when, partialRight } from '@services/utils'
import { DefaultCard } from '@/features/card'
import { moveCard, moveColumn, addColumn, removeColumn, changeColumn, addCard, removeCard } from '@services/helpers'
import { Card, Column, KanbanBoard } from '@/types'
import { BoardContainer } from './Container'
import { DefaultColumn } from '@/features/column'
import { SharedProps } from './shared'

export const UncontrolledBoard = function <TCard extends Card>({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn = true,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn = true,
  allowRenameColumn = true,
  onColumnRename,
  onCardNew,
  renderCard,
  allowRemoveCard = true,
  onCardRemove,
  onColumnNew,
  disableCardDrag = false,
  disableColumnDrag = false,
  allowAddCard = true,
  onNewCardConfirm,
}: UncontrolledBoardProps<TCard>) {
  const [board, setBoard] = useState(initialBoard)

  // @ts-expect-error TS(7031) FIXME: Binding element 'source' implicitly has an 'any' t... Remove this comment to see the full error message
  const handleOnDragEnd = ({ source, destination, subject }, { moveCallback, notifyCallback }) => {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)((callback) => callback(subject, source, destination))
    setBoard(reorderedBoard)
  }

  const handleColumnAdd = async (newColumn: Omit<Column<TCard>, 'id'>) => {
    // TODO: Need to check if confirms fire w/o IDs
    const column = renderColumnAdder ? newColumn : await onNewColumnConfirm?.(newColumn)
    if (!column) throw new Error('Cant add falsy column')
    const boardWithNewColumn = addColumn<TCard>(board, column)
    onColumnNew?.({ board: boardWithNewColumn, column: column as Column<TCard> })
    setBoard(boardWithNewColumn)
  }

  const handleColumnRemove = (column: Column<TCard>) => {
    const filteredBoard = removeColumn(board, column)
    onColumnRemove?.({ board: filteredBoard, column })
    setBoard(filteredBoard)
  }

  const handleColumnRename = (column: Column<TCard>, title: string) => {
    const boardWithRenamedColumn = changeColumn<TCard>(board, column, { title })
    onColumnRename?.({ board: boardWithRenamedColumn, column: { ...column, title } })
    setBoard(boardWithRenamedColumn)
  }

  const handleCardAdd = (column: Column<TCard>, card: TCard, options = {}) => {
    const boardWithNewCard = addCard<TCard>(board, column, card, options)
    const targetColumn = boardWithNewCard.columns.find(({ id }) => id === column.id)
    if (!targetColumn) throw new Error('Cannot find target column')

    onCardNew?.({ board: boardWithNewCard, column: targetColumn, card })
    setBoard(boardWithNewCard)
  }

  const handleDraftCardAdd = async (column: Column<TCard>, card: TCard, options = {}) => {
    const newCard = await onNewCardConfirm?.(card)
    if (!newCard) throw new Error('Cant add falsy card')
    handleCardAdd(column, newCard, options)
  }

  const handleCardRemove = (column: Column<TCard>, card: TCard) => {
    const boardWithoutCard = removeCard<TCard>(board, column, card)
    const targetColumn = boardWithoutCard.columns.find(({ id }) => id === column.id)
    if (!targetColumn) throw new Error('Cannot find target column')
    onCardRemove?.({ board: boardWithoutCard, column: targetColumn, card })
    setBoard(boardWithoutCard)
  }

  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd })
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
    moveCallback: moveColumn,
    notifyCallback: onColumnDragEnd,
  })

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder({ addColumn: handleColumnAdd })
        if (!onNewColumnConfirm) return null

        return <ColumnAdder onConfirm={(title) => handleColumnAdd({ title, cards: [] })} />
      }}
      // TODO: Check because og this could be falsy, also no idea what bound thing is
      renderColumnHeader={(column) => {
        if (renderColumnHeader) {
          // TODO: Refactor this into a better signature
          return renderColumnHeader(column, {
            removeColumn: handleColumnRemove.bind(null, column),
            renameColumn: handleColumnRename.bind(null, column),
            addCard: handleCardAdd.bind(null, column),
          })
        } else {
          return (
            <DefaultColumn
              allowRemoveColumn={allowRemoveColumn}
              onColumnRemove={(updatedColumn) => onColumnRemove?.({ board, column: updatedColumn })}
              allowRenameColumn={allowRenameColumn}
              onColumnRename={(renamedColumn) => onColumnRename?.({ board, column: renamedColumn })}
            >
              {column}
            </DefaultColumn>
          )
        }
      }}
      renderCard={(column, card, dragging) => {
        if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, column, card), dragging })
        return (
          <DefaultCard<TCard>
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            onCardRemove={(card) => handleCardRemove(column, card)}
          >
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={handleColumnRemove}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={handleColumnRename}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      onCardNew={async (column, card) => await handleDraftCardAdd(column, card, allowAddCard)}
      allowAddCard={!!allowAddCard && !!onNewCardConfirm}
      board={board}
    />
  )
}

interface ColumnAdderBag<TCard extends Card> {
  addColumn: (newColumn: Column<TCard>) => Promise<void>
}

interface Position {
  on: 'top' | 'bottom'
}

// TODO: Fix bound function into proper signature
interface ColumnHeaderBag<TCard extends Card> {
  removeColumn: () => void
  renameColumn: (title: string) => void
  addCard: (card: TCard, options?: Position) => void
}

export interface UncontrolledBoardProps<TCard extends Card> extends SharedProps<TCard> {
  initialBoard: KanbanBoard<TCard>
  /** If not provided , will render the default column adder */
  renderColumnAdder?: (options: ColumnAdderBag<TCard>) => JSX.Element
  /** If not provided , will render the default column header */
  renderColumnHeader?: (column: Column<TCard>, options: ColumnHeaderBag<TCard>) => JSX.Element
}
