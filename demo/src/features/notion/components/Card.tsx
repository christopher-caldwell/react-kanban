import { UncontrolledBoardProps } from '@caldwell619/react-kanban'
import { Unstable_Grid2 as Grid, Card, CardContent, styled, Typography } from '@mui/material'
import shouldForwardProp from '@emotion/is-prop-valid'

import { CustomCard, ticketTypeToBgColor } from '@/data'

export const renderCard: UncontrolledBoardProps<CustomCard>['renderCard'] = card => {
  const bgColor = ticketTypeToBgColor[card.ticketType]
  return (
    <Card sx={{ width: '300px' }}>
      <CardContent component={p => <Grid {...p} container spacing={1} />}>
        <Grid>
          <Typography>{card.title}</Typography>
        </Grid>
        <Grid xs={12}>
          <ColoredBgText bgColor={bgColor}>
            {card.storyPoints} - {card.ticketType}
          </ColoredBgText>
        </Grid>
        <Grid>
          <Typography>{card.createdAt.toDateString()}</Typography>
        </Grid>
      </CardContent>
    </Card>
  )
}

export const ColoredBgText = styled('span', { shouldForwardProp })<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  margin-right: 10px;
  border-radius: 4px;
  padding: 0 8px 1px 8px;
`
