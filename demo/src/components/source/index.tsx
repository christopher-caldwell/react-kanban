import { FC } from 'react'
import { styled, Link, Typography } from '@mui/material'
import { Divider } from '@mui/material'

export const Source: FC<Props> = ({ title, url }) => {
  return (
    <>
      <Typography variant='h5'>
        {title}:{' '}
        <NotUglyLink href={url} target='_blank' rel='noopener'>
          Source
        </NotUglyLink>
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
    </>
  )
}

interface Props {
  title: string
  url: string
}

export const NotUglyLink = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
`
