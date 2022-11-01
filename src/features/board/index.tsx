import { Card } from '@/types'
import { ControlledBoard, ControlledBoardProps, UncontrolledBoard, UncontrolledBoardProps } from './components'

export const Board = function <TCard extends Card>({ initialBoard, children, ...restProps }: Props<TCard>) {
  if (initialBoard) return <UncontrolledBoard initialBoard={initialBoard} {...restProps} />
  if (children) return <ControlledBoard {...(restProps as ControlledBoardProps<TCard>)}>{children}</ControlledBoard>
  throw new Error('Must provide either "children" or "initialBoard" props')
}

export type Props<TCard extends Card> =
  | (Partial<UncontrolledBoardProps<TCard>> & { children?: never })
  | (Partial<ControlledBoardProps<TCard>> & { initialBoard?: never })

export * from './components'
