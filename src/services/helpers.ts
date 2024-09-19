import { Card, Column, KanbanBoard } from '@/types'
import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
} from '@services/utils'

function reorderCardsOnColumn<TCard extends Card>(column: Column<TCard>, reorderCards: (cards: TCard[]) => TCard[]): Column<TCard> {
  return { ...column, cards: reorderCards(column.cards) }
}

function moveColumn<TCard extends Card>(board: KanbanBoard<TCard>, fromPosition: number, toPosition: number): KanbanBoard<TCard> {
  return { ...board, columns: changeElementOfPositionInArray(board.columns, fromPosition, toPosition) }
}

function moveCard<TCard extends Card>(
  board: KanbanBoard<TCard>,
  fromPosition: number,
  fromColumnId: string,
  toPosition: number,
  toColumnId: string
): KanbanBoard<TCard> {
  const sourceColumn = board.columns.find((column) => column.id === fromColumnId)
  const destinationColumn = board.columns.find((column) => column.id === toColumnId)

  if (!sourceColumn || !destinationColumn) {
    throw new Error('Source or destination column not found')
  }

  const reorderColumnsOnBoard = (reorderColumnsMapper: (column: Column<TCard>) => Column<TCard>) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper),
  })

  const reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn)
  const reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn)

  if (sourceColumn.id === destinationColumn.id) {
    const reorderedCardsOnColumn = reorderCardsOnSourceColumn((cards) => changeElementOfPositionInArray(cards, fromPosition, toPosition))
    return reorderColumnsOnBoard((column) => (column.id === sourceColumn.id ? reorderedCardsOnColumn : column))
  } else {
    const reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn((cards) => removeFromArrayAtPosition(cards, fromPosition))
    const reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn((cards) => addInArrayAtPosition(cards, sourceColumn.cards[fromPosition], toPosition))
    return reorderColumnsOnBoard((column) => {
      if (column.id === sourceColumn.id) return reorderedCardsOnSourceColumn
      if (column.id === destinationColumn.id) return reorderedCardsOnDestinationColumn
      return column
    })
  }
}

function addColumn<TCard extends Card>(board: KanbanBoard<TCard>, column: Partial<Column<TCard>>): KanbanBoard<TCard> {
  return { ...board, columns: addInArrayAtPosition(board.columns, column as Column<TCard>, board.columns.length) }
}

function removeColumn<TCard extends Card>(board: KanbanBoard<TCard>, column: Column<TCard>): KanbanBoard<TCard> {
  return { ...board, columns: board.columns.filter(({ id }) => id !== column.id) }
}

function changeColumn<TCard extends Card>(board: KanbanBoard<TCard>, column: Column<TCard>, newColumn: Partial<Column<TCard>>): KanbanBoard<TCard> {
  const changedColumns = replaceElementOfArray(board.columns)({
    when: ({ id }) => id === column.id,
    for: (value) => ({
      ...value,
      ...newColumn,
    }),
  })
  return { ...board, columns: changedColumns }
}

function addCard<TCard extends Card>(board: KanbanBoard<TCard>, inColumn: Column<TCard>, card: TCard, { on }: { on?: 'top' | 'bottom' } = {}): KanbanBoard<TCard> {
  const columnToAdd = board.columns.find(({ id }) => id === inColumn.id)
  if (!columnToAdd) throw new Error(`Cannot find column with ID: ${inColumn.id}`)
  const cards = addInArrayAtPosition(columnToAdd.cards, card, on === 'top' ? 0 : columnToAdd.cards.length)
  const columns = replaceElementOfArray(board.columns)({
    when: ({ id }) => inColumn.id === id,
    for: (value) => ({
      ...value,
      cards,
    }),
  })
  return { ...board, columns }
}

function removeCard<TCard extends Card>(board: KanbanBoard<TCard>, fromColumn: Column<TCard>, card: TCard): KanbanBoard<TCard> {
  const columnToRemove = board.columns.find(({ id }) => id === fromColumn.id)
  if (!columnToRemove) throw new Error(`Cannot find column with ID: ${fromColumn.id}`)
  const filteredCards = columnToRemove.cards.filter(({ id }) => card.id !== id)
  const columnWithoutCard = { ...columnToRemove, cards: filteredCards }
  const filteredColumns = board.columns.map((column) => (fromColumn.id === column.id ? columnWithoutCard : column))
  return { ...board, columns: filteredColumns }
}

function changeCard<TCard extends Card>(board: KanbanBoard<TCard>, cardId: string, newCard: Partial<TCard>): KanbanBoard<TCard> {
  const changedCards = (cards: TCard[]) =>
    replaceElementOfArray(cards)({
      when: ({ id }) => id === cardId,
      for: (card) => ({
        ...card,
        ...newCard,
      }),
    })

  return {
    ...board,
    columns: board.columns.map((column) => ({
      ...column,
      cards: changedCards(column.cards),
    })),
  }
}

export { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard }
