import { FC } from 'react'
import { Box, Button, Divider, IconButton, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { NewMenu } from './NewMenu'

export const Filters: FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <NormalCaseButton size='small' variant='text' startIcon={<AddIcon fontSize='small' />}>
            Add a view
          </NormalCaseButton>
        </Box>
        <Box>
          <NormalCaseButton size='small' variant='text'>
            Properties
          </NormalCaseButton>
          <NormalCaseButton size='small' variant='text'>
            Project
          </NormalCaseButton>
          <NormalCaseButton size='small' variant='text'>
            Filter
          </NormalCaseButton>
          <NormalCaseButton size='small' variant='text'>
            Sort
          </NormalCaseButton>
          <NormalCaseButton size='small' variant='text' endIcon={<SearchIcon />}>
            Search
          </NormalCaseButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
          <NewMenu />
        </Box>
      </Box>
      <Divider />
    </>
  )
}

const NormalCaseButton = styled(Button)`
  text-transform: none;
`
