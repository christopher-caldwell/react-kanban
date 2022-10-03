import { FC } from 'react'
import { UncontrolledBoard } from '@caldwell619/react-kanban'

import { board, CustomCard } from '@/data'
import { Source } from '@/components'
import { Filters, renderCard, Header, renderColumnHeader } from './components'

export const JiraDemo: FC = () => {
  return (
    <>
      <Source title='Jira' url='/' />
      <Header />
      <Filters />

      <UncontrolledBoard<CustomCard>
        initialBoard={board}
        renderCard={renderCard}
        renderColumnHeader={renderColumnHeader}
      />
    </>
  )
}
