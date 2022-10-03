import { Card, KanbanBoard } from '@caldwell619/react-kanban'
import { v4 as uuid } from 'uuid'
import randomRgba from 'random-rgba'
import { faker } from '@faker-js/faker'

enum TicketType {
  Bug = 'bug',
  Feature = 'feature',
  Enhancement = 'enhancement'
}
export const ticketTypeToColor: Record<TicketType, string> = {
  [TicketType.Enhancement]: 'blue',
  [TicketType.Bug]: 'red',
  [TicketType.Feature]: 'green'
}
export const ticketTypeToBgColor: Record<TicketType, string> = {
  [TicketType.Enhancement]: randomRgba(30),
  [TicketType.Bug]: randomRgba(30),
  [TicketType.Feature]: randomRgba(30)
}
export interface CustomCard extends Card {
  id: string
  assigneeId: number
  storyPoints: number
  prLink?: string
  ticketType: TicketType
  createdAt: Date
}
const storyPointGenerator = () => Math.round(Math.random() * 10 + 1)
const assigneeIdGenerator = () => Math.round(Math.random() * 3 + 1)
export const board: KanbanBoard<CustomCard> = {
  columns: [
    {
      id: uuid(),
      title: 'Backlog',
      cards: [
        {
          id: uuid(),
          title: 'Implement feedback collector',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Feature,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Bump version for new API for billing',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Bug,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Add NPS feedback to wallboard',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Enhancement,
          createdAt: faker.date.past()
        }
      ]
    },
    {
      id: uuid(),
      title: 'In Progress',
      cards: [
        {
          id: uuid(),
          title: 'Update T&C copy with v1.9 from the writers guild in all products that have cross country compliance',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Bug,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Tech spike on new Stripe integration with PayPal',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Enhancement,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Refactor Stripe verification key validator to a single call to avoid timing out on slow connections',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Feature,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Change phone number field to type "phone"',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          ticketType: TicketType.Enhancement,
          createdAt: faker.date.past()
        }
      ]
    },
    {
      id: uuid(),
      title: 'In Review',
      cards: [
        {
          id: uuid(),
          title: 'Multi-dest search UI web',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          prLink: 'https://google.com',
          ticketType: TicketType.Feature,
          createdAt: faker.date.past()
        }
      ]
    },
    {
      id: uuid(),
      title: 'Done',
      cards: [
        {
          id: uuid(),
          title: 'Quick booking for accommodations - web',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          prLink: 'https://google.com',
          ticketType: TicketType.Feature,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Adapt web app no new payments provider',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          prLink: 'https://google.com',
          ticketType: TicketType.Bug,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Fluid booking on tables',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          prLink: 'https://google.com',
          ticketType: TicketType.Feature,
          createdAt: faker.date.past()
        },
        {
          id: uuid(),
          title: 'Shopping card purchasing error - quick fix required',
          description: 'Card content',
          assigneeId: assigneeIdGenerator(),
          storyPoints: storyPointGenerator(),
          prLink: 'https://google.com',
          ticketType: TicketType.Bug,
          createdAt: faker.date.past()
        }
      ]
    }
  ]
}

// export const cardsKeyedById: Record<string | number, Card> = board.columns.reduce<Record<string | number, Card>>(
//   (total, current) => {
//     const cards: Record<string | number, Card> = current.cards.reduce((cardTotal, card) => {
//       return {
//         ...cardTotal,
//         [card.id]: card
//       }
//     }, {})
//     return {
//       ...total,
//       ...cards
//     }
//   },
//   {}
// )

// export const getCard = (id: number | string) => {
//   const targetCard = cardsKeyedById[id]
//   if (!targetCard) throw new Error(`Cannot find card with ID: ${id}`)
//   return targetCard
// }
