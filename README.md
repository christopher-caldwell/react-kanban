# caldwell619 React Kanban

[![NPM](https://img.shields.io/npm/v/@caldwell619/react-kanban.svg)](https://www.npmjs.com/package/@caldwell619/react-kanban) [![NPM](https://img.shields.io/bundlephobia/min/@caldwell619/react-kanban)](https://www.npmjs.com/package/@caldwell619/react-kanban) [![](https://img.shields.io/github/last-commit/christopher-caldwell/react-kanban)]() [![](https://img.shields.io/npm/types/typescript)]()

## asseinfo's React Kanban

Forked from [asseinfo's React Kanban](https://github.com/asseinfo/react-kanban)

Shout out to all the contributors.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://blog.lourenci.com/"><img src="https://avatars3.githubusercontent.com/u/2339362?v=4?s=100" width="100px;" alt="Leandro Lourenci"/><br /><sub><b>Leandro Lourenci</b></sub></a><br /><a href="#question-lourenci" title="Answering Questions">💬</a> <a href="https://github.com/caldwell619/react-kanban/issues?q=author%3Alourenci" title="Bug reports">🐛</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=lourenci" title="Code">💻</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=lourenci" title="Documentation">📖</a> <a href="#example-lourenci" title="Examples">💡</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=lourenci" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4?s=100" width="100px;" alt="Gleb Bahmutov"/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=bahmutov" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/mathesouza"><img src="https://avatars0.githubusercontent.com/u/20099472?v=4?s=100" width="100px;" alt="Matheus Sabino"/><br /><sub><b>Matheus Sabino</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=mathesouza" title="Code">💻</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=mathesouza" title="Documentation">📖</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=mathesouza" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/dizzyrobin"><img src="https://avatars0.githubusercontent.com/u/21962999?v=4?s=100" width="100px;" alt="Pedro Javier Nicolás"/><br /><sub><b>Pedro Javier Nicolás</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=dizzyrobin" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/MatheusPoliCamilo"><img src="https://avatars3.githubusercontent.com/u/25781749?v=4?s=100" width="100px;" alt="Matheus Poli"/><br /><sub><b>Matheus Poli</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=MatheusPoliCamilo" title="Code">💻</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=MatheusPoliCamilo" title="Tests">⚠️</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=MatheusPoliCamilo" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/sousajunior"><img src="https://avatars0.githubusercontent.com/u/17458197?v=4?s=100" width="100px;" alt="Carlinhos de Sousa Junior"/><br /><sub><b>Carlinhos de Sousa Junior</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=sousajunior" title="Code">💻</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=sousajunior" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/PeteDuncanson"><img src="https://avatars.githubusercontent.com/u/1674590?v=4?s=100" width="100px;" alt="Pete Duncanson"/><br /><sub><b>Pete Duncanson</b></sub></a><br /><a href="https://github.com/caldwell619/react-kanban/commits?author=PeteDuncanson" title="Code">💻</a> <a href="https://github.com/caldwell619/react-kanban/commits?author=PeteDuncanson" title="Documentation">📖</a> <a href="#example-PeteDuncanson" title="Examples">💡</a></td>
    </tr>
  </tbody>
  <tfoot>
    
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Why fork?

- The original library seems to not be maintained anymore. The last commit at this time is September of 2021.
- The original library did not include TypeScript types. It was written in JS without providing any types. This fork is natively written in TypeScript.
<!-- Outdated build, no demo -->

## Road Map

[Here](./docs/roadmap.md) is what's in the queue. If you want to see something, [make an issue](https://github.com/christopher-caldwell/react-kanban/issues/new)

## Demo

[Link](https://christopher-caldwell.github.io/react-kanban)

## Setup

```bash
yarn add @caldwell619/react-kanban
```

## Usage

There are 2 main boards, `Controlled` and `Uncontrolled`.

This is a deviation from the original, as there was only one board exported. In the original, there's an in-library determination on whether or not the board is controlled. That is not quite how this works, as you will know upfront whether or not your board is controlled.

With that in mind, you can import each of the boards like this:

```tsx
import { UncontrolledBoard, KanbanBoard } from '@caldwell619/react-kanban'
// import { ControlledBoard } from '@caldwell619/react-kanban'
import '@caldwell619/react-kanban/dist/styles.css' // import here for "builtin" styles

const board: KanbanBoard = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column'
        },
      ]
    },
    { ... }
  ]
}

<UncontrolledBoard initialBoard={board} />
```

### Uncontrolled

With an uncontrolled board, you pass an `initialBoard` prop, which will be the basis of the internal state. When a user moves something, that is all controlled by internal state.

### Controlled

When you need a better control over the board, you should stick with the controlled board.
A controlled board means you need to deal with the board state yourself, you need to keep the state in your hands (component) and pass this state to the `<Board />`, we just reflect this state.

If you go with the controlled one, you need to pass your board through the `children` prop.

### Board

If you really want to use the one unified board, you can still do so with `Board`. Whether or not you provide `initialBoard` or `children` will determine which board you're using. If you provide both, `UncontrolledBoard` takes priority.

See an example, [here](./demo/src/features/one-board/index.tsx).

### Helpers to work with the controlled board

Helpers are exposed to help with the management of your board state when using the `ControlledBoard`. They are the same helpers used internally, so you can utilize them to assist in your controlled state.

```tsx
import { ControlledBoard, moveCard, KanbanBoard, OnDragEndNotification, Card } from '@caldwell619/react-kanban'

const MyBoard = () => {
  const [board, setBoard] = useState<KanbanBoard>(initialBoard)

  const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
    setBoard((currentBoard) => {
      return moveCard(currentBoard, source, destination)
    })
  }

  return <ControlledBoard onCardDragEnd={handleCardMove}>{board}</ControlledBoard>
}
```

[Full list of helpers](./docs/helpers.md).

## Board type

If you're using JS, this section doesn't have any effect on you.

The TypeScript type for the board is `KanbanBoard`. It is a generic that accepts `TCard extends Card`. Your data will undoubtedly need to be customized, so all the helpers and Board will accept your `TCard`.

```tsx
import { Card } from '@caldwell619/react-kanban'

interface CustomCard extends Card {
  storyPoints: number
}
export const renderCard: UncontrolledBoardProps<CustomCard>['renderCard'] = (card) => {
  // Can access with `card.storyPoints`
  return <CardWithStoryPoints {...card} />
}
```

This behavior will applied throughout the render and confirm methods.

```tsx
import { ControlledBoard, KanbanBoard } from '@caldwell619/react-kanban'

const CustomBoard = () => {
  return (
    <ControlledBoard<CustomCard>
      renderCard={(card) => {
        // `card.storyPoints`
        return <CardWithStoryPoints {...card} />
      }}
    >
      {board}
    </ControlledBoard>
  )
}
```

## Props

For an exhaustive ( yet still **WIP** ) list of props you can pass, refer to [this page](./props.md).

## Styling

You can either style all the board or import our style and override it with the styles you want. Ideally you would render the column instead of overriding CSS, however this may be helpful for you if your use case needs it.

| Class                                       |
| ------------------------------------------- |
| `react-kanban-board`                        |
| `react-kanban-card`                         |
| `react-kanban-card-skeleton`                |
| `react-kanban-card--dragging`               |
| `react-kanban-card__description`            |
| `react-kanban-card__title`                  |
| `react-kanban-column`                       |
| `react-kanban-card-adder-form`              |
| `react-kanban-card-adder-button`            |
| `react-kanban-card-adder-form__title`       |
| `react-kanban-card-adder-form__description` |
| `react-kanban-card-adder-form__button`      |
| `react-kanban-column-header`                |
| `react-kanban-column-header__button`        |
| `react-kanban-column-adder-button`          |

## Contributing

PRs are welcome.

### Steps

- File an [issue](https://github.com/christopher-caldwell/react-kanban/issues), using the issue template.
- Fork this project.
- Clone your fork
- In your fork, run `yarn` to install deps
- Begin work
- Add yourself to the contributors table, this is powered by [all-contributors](https://allcontributors.org/)
  - `yarn all-contributors add`
  - `yarn all-contributors generate`
- Submit your PR across forks with the target base as `christopher-caldwell:master`.
