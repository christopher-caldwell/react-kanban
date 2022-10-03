import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { UncontrolledBoardProps } from '@caldwell619/react-kanban'

import { CustomCard } from '@/data'

export const renderColumnHeader: UncontrolledBoardProps<CustomCard>['renderColumnHeader'] = (
  { title, cards },
  { removeColumn }
) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant='subtitle2'>
        {title} {cards.length}
      </Typography>
      <IconButton onClick={removeColumn}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}
