# React Kanban - Props

**WIP** These are copy pasted from the original, but there are a few inconsistencies that need addressing. This library is fully typed, natively written in TS. If you need to know the options, refer to the types.

| Prop                                                                                                                          | Description                                                                                                       | Controlled | Uncontrolled |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | ------------ |
| [`children`](#children) (required if controlled)                                                                              | The board to render                                                                                               | ✅         | 🚫           |
| [`initialBoard`](#initialboard) (required if uncontrolled)                                                                    | The board to render                                                                                               | 🚫         | ✅           |
| [`onCardDragEnd`](#oncarddragend)                                                                                             | Callback that will be called when the card move ends                                                              | ✅         | ✅           |
| [`onColumnDragEnd`](#oncolumndragend)                                                                                         | Callback that will be called when the column move ends                                                            | ✅         | ✅           |
| [`renderCard`](#rendercard)                                                                                                   | A card to be rendered instead of the default card                                                                 | ✅         | ✅           |
| [`renderColumnHeader`](#rendercolumnheader)                                                                                   | A column header to be rendered instead of the default column header                                               | ✅         | ✅           |
| [`allowAddColumn`](#allowaddcolumn)                                                                                           | Allow a new column be added by the user                                                                           | ✅         | ✅           |
| [`onNewColumnConfirm`](#onnewcolumnconfirm) (required if use the default column adder template)                               | Callback that will be called when a new column is confirmed by the user through the default column adder template | ✅         | ✅           |
| [`onColumnNew`](#oncolumnnew) (required if `allowAddColumn` or when [`addColumn`](#rendercolumnadder) is called)              | Callback that will be called when a new column is added through the default column adder template                 | 🚫         | ✅           |
| [`renderColumnAdder`](#rendercolumnadder)                                                                                     | A column adder to be rendered instead of the default column adder template                                        | ✅         | ✅           |
| [`disableColumnDrag`](#disablecolumndrag)                                                                                     | Disable the column move                                                                                           | ✅         | ✅           |
| [`disableCardDrag`](#disablecarddrag)                                                                                         | Disable the card move                                                                                             | ✅         | ✅           |
| [`allowRemoveColumn`](#allowremovecolumn)                                                                                     | Allow to remove a column in default column header                                                                 | ✅         | ✅           |
| [`onColumnRemove`](#oncolumnremove) (required if `allowRemoveColumn` or when [`removeColumn`](#rendercolumnheader) is called) | Callback that will be called when a column is removed                                                             | ✅         | ✅           |
| [`allowRenameColumn`](#allowrenamecolumn)                                                                                     | Allow to rename a column in default column header                                                                 | ✅         | ✅           |
| [`onColumnRename`](#oncolumnrename) (required if `allowRenameColumn` or when [`renameColumn`](#rendercolumnheader) is called) | Callback that will be called when a column is renamed                                                             | ✅         | ✅           |
| [`allowRemoveCard`](#allowremovecard)                                                                                         | Allow to remove a card in default card template                                                                   | ✅         | ✅           |
| [`onCardRemove`](#oncardremove) (required if `allowRemoveCard`)                                                               | Callback that will be called when a card is removed                                                               | ✅         | ✅           |
| [`allowAddCard`](#allowaddcard)                                                                                               | Allow to add a card. Expect an object with the position to add the card in the column.                            | 🚫         | ✅           |
| [`onCardNew`](#oncardnew) (required if `allowAddCard` or when [`addCard`](#rendercolumnheader) is called)                     | Callback that will be called when a new card is added through the default card adder template                     | 🚫         | ✅           |
| [`onNewCardConfirm`](#onnewcardconfirm) (required if `allowAddCard`)                                                          | Callback that will be called when a new card is confirmed by the user through the default card adder template     | 🚫         | ✅           |

#### `children`

The board. Use this prop if you want to control the board's state.

#### `initialBoard`

The board. Use this prop if you don't want to control the board's state.

#### `onCardDragEnd`

When the user moves a card, this callback will be called passing these parameters:

| Arg           | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `board`       | The modified board                                               |
| `card`        | The moved card                                                   |
| `source`      | An object with the card source `{ fromColumnId, fromPosition }`  |
| `destination` | An object with the card destination `{ toColumnId, toPosition }` |

##### Source and destination

| Prop           | Description                                 |
| -------------- | ------------------------------------------- |
| `fromColumnId` | Column source id.                           |
| `toColumnId`   | Column destination id.                      |
| `fromPosition` | Card's index in column source's array.      |
| `toPosition`   | Card's index in column destination's array. |

#### `onColumnDragEnd`

When the user moves a column, this callback will be called passing these parameters:

| Arg           | Description                                            |
| ------------- | ------------------------------------------------------ |
| `board`       | The modified board                                     |
| `column`      | The moved column                                       |
| `source`      | An object with the column source `{ fromPosition }`    |
| `destination` | An object with the column destination `{ toPosition }` |

##### Source and destination

| Prop           | Description                     |
| -------------- | ------------------------------- |
| `fromPosition` | Column index before the moving. |
| `toPosition`   | Column index after the moving.  |

#### `renderCard`

Use this if you want to render your own card. You have to pass a function and return your card component.
The function will receive these parameters:

| Arg       | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `card`    | The card props                                                   |
| `cardBag` | A bag with some helper functions and state to work with the card |

##### `cardBag`

| function      | Description                                           |
| ------------- | ----------------------------------------------------- |
| `removeCard*` | Call this function to remove the card from the column |
| `dragging`    | Whether the card is being dragged or not              |

\* It's unavailable when the board is controlled.

Ex.:

```js
const board = {
  columns: [{
    id: ${unique-required-columnId},
    title: ${columnTitle},
    cards: [{
      id: ${unique-required-cardId},
      dueDate: ${cardDueDate},
      content: ${cardContent}
    }]
  }]
}

<Board
  renderCard={({ content }, { removeCard, dragging }) => (
    <YourCard dragging={dragging}>
      {content}
      <button type="button" onClick={removeCard}>Remove Card</button>
    </YourCard>
  )}
>
{board}
</Board>
```

#### `renderColumnHeader`

Use this if you want to render your own column header. You have to pass a function and return your column header component.
The function will receive these parameters:

| Arg         | Description                                              |
| ----------- | -------------------------------------------------------- |
| `column`    | The column props                                         |
| `columnBag` | A bag with some helper functions to work with the column |

##### `columnBag`

| function        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `removeColumn*` | Call this function to remove the column from the board     |
| `renameColumn*` | Call this function with a title to rename the column       |
| `addCard*`      | Call this function with a new card to add it in the column |

**`addCard`**: As a second argument you can pass an option to define where in the column you want to add the card:

- `{ on: 'top' }`: to add on the top of the column.
- `{ on: 'bottom' }`: to add on the bottom of the column (default).

\* It's unavailable when the board is controlled.

Ex.:

```js
const board = {
  columns: [{
    id: ${unique-required-columnId},
    title: ${columnTitle},
    wip: ${wip},
    cards: [{
      id: ${unique-required-cardId},
      title: ${required-cardTitle},
      description: ${required-cardDescription}
    }]
  }]
}

<Board
  renderColumnHeader={({ title }, { removeColumn, renameColumn, addCard }) => (
    <YourColumnHeader>
      {title}
      <button type='button' onClick={removeColumn}>Remove Column</button>
      <button type='button' onClick={() => renameColumn('New title')}>Rename Column</button>
      <button type='button' onClick={() => addCard({ id: 99, title: 'New Card' })}>Add Card</button>
    </YourColumnHeader
  )}
>
  {board}
</Board>
```

#### `allowAddColumn`

Allow the user to add a new column directly by the board.

#### `onNewColumnConfirm`

When the user confirms a new column through the default column adder template, this callback will be called with a draft of a column with the title typed by the user.

If your board is uncontrolled you **must** return the new column with its new id in this callback.

If your board is controlled use this to get the new column title.

Ex.:

```js
function onColumnNew (newColumn) {
  const newColumn = { id: ${required-new-unique-columnId}, ...newColumn }
  return newColumn
}

<Board initialBoard={board} allowAddColumn onColumnNew={onColumnNew} />
```

#### `onColumnNew`

When the user adds a new column through the default column adder template, this callback will be called passing the updated board and the new column.

This callback will not be called in an uncontrolled board.

#### `renderColumnAdder`

Use this if you want to render your own column adder. You have to pass a function and return your column adder component.
The function will receive these parameters:

| Arg         | Description                      |
| ----------- | -------------------------------- |
| `columnBag` | A bag with some helper functions |

##### `columnBag`

| function     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `addColumn*` | Call this function with a new column to add the new column |

\* It's unavailable when the board is controlled.

Ex.:

```js
const ColumnAdder = ({ addColumn }) {
  return (
    <div onClick={()=> addColumn({id: ${required-new-unique-columnId}, title: 'Title', cards:[]})}>
      Add column
    </div>
  )
}

<Board
  allowAddColumn
  renderColumnAdder={({ addColumn }) => <ColumnAdder addColumn={addColumn} />}
  {board}
</Board>
```

#### `disableColumnDrag`

Disallow the user from move a column.

#### `disableCardDrag`

Disallow the user from move a card.

#### `allowRemoveColumn`

When using the default header template, when you don't pass a template through the `renderColumnHeader`, it will allow the user to remove a column.

#### `onColumnRemove`

When the user removes a column, this callback will be called passing these parameters:

| Arg      | Description                          |
| -------- | ------------------------------------ |
| `board`  | The board without the removed column |
| `column` | The removed column                   |

#### `allowRenameColumn`

When using the default header template, when you don't pass a template through the `renderColumnHeader`, it will allow the user to rename a column.

#### `onColumnRename`

When the user renames a column, this callback will be called passing these parameters:

| Arg      | Description                       |
| -------- | --------------------------------- |
| `board`  | The board with the renamed column |
| `column` | The renamed column                |

#### `allowRemoveCard`

When using the default card template, when you don't pass a template through the `renderCard`, it will allow the user to remove a card.

#### `onCardRemove`

When the user removes a card, this callback will be called passing these parameters:

| Arg      | Description                          |
| -------- | ------------------------------------ |
| `board`  | The board without the removed column |
| `column` | The column without the removed card  |
| `card`   | The removed card                     |

#### `allowAddCard`

Allow the user to add a card in the column directly by the board. By default, it adds the card on the bottom of the column, but you can specify whether you want to add at the top or at the bottom of the board by passing an object with 'on' prop.

E.g.:
<Board allowAddCard /> // at the bottom by default
<Board allowAddCard={{ on: 'bottom' }} /> // in the bottom of the column
<Board allowAddCard={{ on: 'top' }} /> // at the top of the column

### 🔩 Helpers to be used with an controlled board

#### `moveColumn`

| Arg                | Description                             |
| ------------------ | --------------------------------------- |
| `board`            | Your board                              |
| `{ fromPosition }` | Index of column to be moved             |
| `{ toPosition }`   | Index destination of column to be moved |

#### `moveCard`

Use this on a controlled board, the "from" and "to" are the same ones passed to onCardDragEnd callback. You can used this within your onCardDragEnd call back to actually update your board as it will return a new board which you can save down into state.

| Arg                              | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `board`                          | Your board                                                                                                           |
| `{ fromPosition, fromColumnId }` | An object with the card source `{ fromColumnId, fromPosition }` which are the indexes of the cards current position  |
| `{ toPosition, toColumnId }`     | An object with the card destination `{ fromColumnId, fromPosition }` which are the indexes of the cards new position |

#### `addColumn`

| Arg      | Description        |
| -------- | ------------------ |
| `board`  | Your board         |
| `column` | Column to be added |

#### `removeColumn`

| Arg      | Description          |
| -------- | -------------------- |
| `board`  | Your board           |
| `column` | Column to be removed |

#### `changeColumn`

| Arg      | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| `board`  | Your board                                                                                        |
| `column` | Column to be renamed                                                                              |
| `object` | Pass a object to be merged with the column. You can add new props and/or change the existing ones |

#### `addCard`

| Arg                    | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `board`                | Your board                                                                          |
| `inColumn`             | Column to add the card be added                                                     |
| `card`                 | Card to be added                                                                    |
| `{ on: 'bottom|top' }` | Whether the card will be added on top or bottom of the column (`bottom` is default) |

#### `changeCard`

| Arg      | Description                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| `board`  | Your board                                                                                      |
| `cardId` | Card's id to be changed                                                                         |
| `object` | Pass a object to be merged with the card. You can add new props and/or change the existing ones |

#### `onCardNew`

When the user adds a new card through the default card adder template, this callback will be called passing the updated board and the new card.

#### `onNewCardConfirm`

When the user confirms a new card through the default card adder template, this callback will be called with a draft of a card with the title and the description typed by the user.

You **must** return the new card with its new id in this callback.

Ex.:

```js
function onCardNew (newCard) {
  const newCard = { id: ${required-new-unique-cardId}, ...newCard }
  return newCard
}

<Board initialBoard={board} allowAddCard onNewCardConfirm={onCardNew} onCardNew={console.log} />
```

#### `removeCard`

| Arg          | Description              |
| ------------ | ------------------------ |
| `board`      | Your board               |
| `fromColumn` | Column where the card is |
| `card`       | Card to be removed       |
