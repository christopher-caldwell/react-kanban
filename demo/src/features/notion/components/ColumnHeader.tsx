import { UncontrolledBoardProps } from '@caldwell619/react-kanban'
import { Box, Button, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import randomRgba from 'random-rgba'

import { createNewCard, CustomCard } from '@/data'
import { ColoredBgText } from './Card'

export const renderColumnHeader: UncontrolledBoardProps<CustomCard>['renderColumnHeader'] = (
  column,
  { addCard, renameColumn }
) => {
  const onAddCard = () => {
    const newCard = createNewCard()
    // Can be async, do mutation here awaiting result, then call `addCard`
    addCard(newCard, { on: 'top' })
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <ColoredBgText bgColor={randomRgba(20)}>{column.title}</ColoredBgText>
        <Typography>{column.cards.length}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
        <IconButton onClick={onAddCard}>
          <AddIcon />
        </IconButton>
        <Button
          onClick={() => {
            const title = window.prompt('new title')
            title && renameColumn(title)
          }}
        >
          Rename column
        </Button>
      </Box>
    </Box>
  )
}
