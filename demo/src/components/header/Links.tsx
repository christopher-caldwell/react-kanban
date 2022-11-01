import { FC } from 'react'
import { Link as MuiLink, styled } from '@mui/material'

export const Links: FC = () => {
  return (
    <>
      <NavigationLink url='#controlled' text='Controlled' />
      <NavigationLink url='#uncontrolled' text='Uncontrolled' />
      <NavigationLink url='#jira' text='Jira' />
      <NavigationLink url='#notion' text='Notion' />
    </>
  )
}

interface NavigationLinkProps {
  url: string
  text: string
}
const NavigationLink: FC<NavigationLinkProps> = ({ url, text }) => {
  return <MuiLink component={() => <NotUglyLocationLink href={url}>{text}</NotUglyLocationLink>} />
}

const NotUglyLocationLink = styled('a')`
  text-decoration: none;
  color: white;
  margin-right: 20px;
`
