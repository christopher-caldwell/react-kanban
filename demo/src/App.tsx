import { FC } from 'react'
import { Box } from '@mui/material'
import '@caldwell619/react-kanban/dist/styles.css'

import { ControlledBoardDemo } from '@/features/controlled'
import { UncontrolledBoardDemo } from '@/features/uncontrolled'
import { JiraDemo } from '@/features/jira'
import { NotionDemo } from '@/features/notion'
import { Header } from './components'

export const App: FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: 3 }}>
        <ControlledBoardDemo />
        <UncontrolledBoardDemo />
        <JiraDemo />
        <NotionDemo />
      </Box>
    </>
  )
}
