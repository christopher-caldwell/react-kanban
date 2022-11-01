import { Card, Column, KanbanBoard } from '@/types'
import { Coordinates } from '@/services/board'

interface CardCallbackInfo<TCard extends Card> {
  board: KanbanBoard<TCard>
  column: Column<TCard>
  card: TCard
}
interface ColumnCallbackInfo<TCard extends Card> {
  board: KanbanBoard<TCard>
  column: Column<TCard>
}
interface CardBag {
  removeCard?: BoundFunction
  dragging: boolean
}

export type BoundFunction = any

export interface SharedProps<TCard extends Card> {
  onCardDragEnd?: OnDragEndNotification<TCard>
  onColumnDragEnd?: OnDragEndNotification<Column<TCard>>
  onColumnRemove?: (info: ColumnCallbackInfo<TCard>) => void
  onCardRemove?: (info: CardCallbackInfo<TCard>) => void
  renderCard?: (card: TCard, options: CardBag) => JSX.Element
  /** If not provided , will render the default card */
  onColumnRename?: (info: ColumnCallbackInfo<TCard>) => void
  onCardNew?: (info: CardCallbackInfo<TCard>) => void
  onColumnNew?: (info: ColumnCallbackInfo<TCard>) => void
  /** Validation in which you provide the ID of the newly created card */
  onNewCardConfirm?: (card: Omit<TCard, 'id'>) => Promise<TCard>
  /** Validation in which you provide the ID of the newly created column */
  onNewColumnConfirm?: (newColumn: Omit<Column<TCard>, 'id'>) => Promise<Column<TCard>>
  /** @default false */
  disableCardDrag?: boolean
  /** @default false */
  disableColumnDrag?: boolean
  /** @default true */
  allowAddCard?: boolean | { on: 'top' | 'bottom' }
  /** @default true */
  allowRemoveCard?: boolean
  /** @default true */
  allowRemoveColumn?: boolean
  /** @default true */
  allowRenameColumn?: boolean
  /** @default true */
  allowAddColumn?: boolean
}
export type OnDragEndNotification<TSubject> = (
  subject: TSubject,
  source: OnDragEnd<TSubject>['source'],
  destination: OnDragEnd<TSubject>['destination']
) => void

export interface OnDragEnd<TSubject> extends Partial<Coordinates> {
  subject: TSubject
}
