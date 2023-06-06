import Card from 'react-bootstrap/Card'
import React, { CSSProperties } from 'react'
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import { SingleColumnProps } from '../types/types'

const SingleColumn: React.FC<SingleColumnProps> = ({ list, title, status }) => {
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: CSSProperties | undefined
  ): CSSProperties => ({
    userSelect: 'none',
    margin: `0 0 1rem 0`,
    ...draggableStyle,
  })

  function daysAgo(dateString: string): string {
    const date = new Date(dateString)
    const today = new Date()
    const timeDiff = Math.abs(today.getTime() - date.getTime())
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return `opened ${daysDiff} days ago`
  }
  return (
    <Card className="border-0">
      <Droppable droppableId={status}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Card.Header className="text-center border-0 bg-white mb-3 fs-2 fw-bold">
              {title}
            </Card.Header>

            <Card.Body className="border bg-secondary ">
              {list.map((item, index) => (
                <Draggable
                  key={item.id != null ? item.id.toString() : ''}
                  draggableId={item.id != null ? item.id.toString() : ''}
                  index={index}
                >
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Card className="mb-3 border-dark">
                        <Card.Body>
                          <Card.Title className="fw-bold">
                            {item.title}
                          </Card.Title>
                          <Card.Text className="font-monospace">
                            #{item.number} {daysAgo(item.created_at)}
                            <br />
                            {item.site_admin ? 'Admin' : 'User'} | Comments:{' '}
                            {item.comments}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </Card.Body>
          </div>
        )}
      </Droppable>
    </Card>
  )
}

export default SingleColumn
