import { FC } from 'react'
import { Typography, styled } from '@mui/material'
import { UncontrolledBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'
import { Filters, renderColumnHeader, renderCard } from './components'

export const NotionDemo: FC = () => {
  return (
    <>
      <Source
        title='Notion'
        url='https://github.com/christopher-caldwell/react-kanban/blob/main/demo/src/features/notion/index.tsx'
      />
      <NotionStyles>
        <Typography variant='h4'>Kanban</Typography>
        <Filters />
        <UncontrolledBoard initialBoard={board} renderColumnHeader={renderColumnHeader} renderCard={renderCard} />
      </NotionStyles>
    </>
  )
}

const NotionStyles = styled('div')`
  & * {
    font-family: 'Segoe' !important;
  }
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Segoe Bold' !important;
  }
  & .react-kanban-column {
    padding: 0;
    background-color: transparent;
  }
`
