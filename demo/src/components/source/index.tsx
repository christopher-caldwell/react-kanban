import { FC } from 'react'
import { styled, Link, Typography } from '@mui/material'
import { Divider } from '@mui/material'

export const Source: FC<Props> = ({ title, url, navId = title.toLocaleLowerCase() }) => {
  return (
    <span id={navId}>
      <Typography variant='h5' sx={{ paddingTop: '10vh' }}>
        {title}:{' '}
        <NotUglyLink href={url} target='_blank' rel='noopener'>
          Source
        </NotUglyLink>
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
    </span>
  )
}

interface Props {
  title: string
  url: string
  navId?: string
}

export const NotUglyLink = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
`
