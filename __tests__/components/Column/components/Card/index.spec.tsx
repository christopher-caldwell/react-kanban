import { Card } from '@/features/card'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { fireEvent, render, screen } from '@testing-library/react'

const SPACE = { keyCode: 32 }
const ARROW_DOWN = { keyCode: 40 }

describe('<Card />', () => {
  const card = {
    id: 1,
    title: 'Card title',
    description: 'Card content',
  }

  const renderCard = (isDragging: boolean) => {
    return <p>{isDragging ? 'Dragging' : card.title}</p>
  }
  function mount() {
    render(
      <DragDropContext onDragEnd={jest.fn}>
        <Droppable droppableId='1'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Card index={0} renderCard={renderCard}>
                {card}
              </Card>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  it('renders the specified card', () => {
    mount()
    expect(screen.queryByText('Card title')).toBeInTheDocument()
  })

  describe('when the card is being dragging', () => {
    it('calls the "renderCard" prop passing the dragging value', async () => {
      mount()
      const card = screen.getByTestId('card-1')

      expect(screen.queryByText('Dragging')).not.toBeInTheDocument()

      fireEvent.keyDown(card, SPACE) // Begins the dnd
      fireEvent.keyDown(card, ARROW_DOWN) // Moves the element

      expect(screen.queryByText('Dragging')).toBeInTheDocument()

      fireEvent.keyDown(card, SPACE) // Ends the dnd

      expect(screen.queryByText('Dragging')).not.toBeInTheDocument()
    })
  })
})
