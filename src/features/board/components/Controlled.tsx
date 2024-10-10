import { ColumnAdder } from '@/features/column-adder'
import { DefaultCard } from '@/features/card'
import { Card, Column, KanbanBoard } from '@/types'
import { DefaultColumn } from '@/features/column'
import { BoardContainer, OnDragEnd } from './Container'
import { SharedProps } from './shared'
import { changeColumn } from '@/services'

export const ControlledBoard = function <TCard extends Card>({
  children: board,
  onCardDragEnd,
  onColumnDragEnd,
  onNewColumnConfirm,
  onColumnRemove,
  onColumnRename,
  onCardRemove,
  renderColumnAdder,
  renderColumnHeader,
  renderCard,
  allowAddColumn = true,
  allowRemoveColumn = true,
  allowRenameColumn = true,
  allowRemoveCard = true,
  allowAddCard = true,
  disableCardDrag = false,
  disableColumnDrag = false,
}: ControlledBoardProps<TCard>) {
  const handleOnCardDragEnd = ({ source, destination, subject }: OnDragEnd<TCard>) => {
    if (onCardDragEnd) {
      onCardDragEnd(subject, source, destination)
    }
  }
  const handleOnColumnDragEnd = ({ source, destination, subject }: OnDragEnd<Column<TCard>>) => {
    if (onColumnDragEnd) {
      onColumnDragEnd(subject, source, destination)
    }
  }
  const handleColumnRename = (column: Column<TCard>, title: string) => {
    const boardWithRenamedColumn = changeColumn<TCard>(board, column, { title })
    onColumnRename?.({ board: boardWithRenamedColumn, column: { ...column, title } })
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder()
        if (!onNewColumnConfirm) return null
        return <ColumnAdder onConfirm={(title) => onNewColumnConfirm({ title, cards: [] })} />
      }}
      renderColumnHeader={
        renderColumnHeader
          ? renderColumnHeader
          : (column) => (
              <DefaultColumn
                allowRemoveColumn={allowRemoveColumn}
                onColumnRemove={(updatedColumn) => onColumnRemove?.({ board, column: updatedColumn })}
                allowRenameColumn={allowRenameColumn}
                onColumnRename={handleColumnRename}
              >
                {column}
              </DefaultColumn>
            )
      }
      renderCard={(_column, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={!!allowRemoveCard}
            onCardRemove={(card) => onCardRemove?.({ board, column: _column, card })}
          >
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={(column) => onColumnRemove?.({ board, column })}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={(column) => onColumnRename?.({ board, column })}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      // TODO: Check these
      onCardNew={() => {
        //
      }}
      allowAddCard={allowAddCard}
      board={board}
    />
  )
}

export type OnDragEndNotification<TSubject> = (
  subject: TSubject,
  source: OnDragEnd<TSubject>['source'],
  destination: OnDragEnd<TSubject>['destination']
) => void
export interface ControlledBoardProps<TCard extends Card> extends SharedProps<TCard> {
  children: KanbanBoard<TCard>
  /** If not provided , will render the default column adder */
  renderColumnAdder?: () => JSX.Element
  /** If not provided , will render the default column header */
  renderColumnHeader?: (column: Column<TCard>) => JSX.Element
}
