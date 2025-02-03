import { withDroppable } from '@/features/with-droppable'
import { DragDropContext } from '@hello-pangea/dnd'
import { render } from '@testing-library/react'
import { forwardRef } from 'react'

describe('#withDroppable', () => {
  let subject: any
  beforeEach(() => {
    const ref = forwardRef<HTMLSpanElement>((props, ref) => <span {...props} ref={ref} />)
    const Droppable = withDroppable(ref)
    subject = render(
      <DragDropContext onDragEnd={jest.fn}>
        <Droppable droppableId='1'>
          <div id='children' />
        </Droppable>
      </DragDropContext>
    )
  })
  afterEach(() => {
    subject = undefined
  })
  it('returns a droppable component', () => {
    expect(subject.container.querySelector('span > #children')).toBeInTheDocument()
  })
})
