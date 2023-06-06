import SingleColumn from './SingleColumn'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ColumnListsProps, Issue } from '../types/types'

const ColumnLists: React.FC<ColumnListsProps> = ({
  url,
  toDo,
  inProgress,
  done,
}) => {
  const [storageList, setStorageList] = useState<ColumnListsProps>(() => {
    const storedData = localStorage.getItem(url)
    return storedData ? JSON.parse(storedData) : { url, toDo, inProgress, done }
  })
  useEffect(() => {
    const storedData = localStorage.getItem(url)
    if (storedData) {
      setStorageList(JSON.parse(storedData))
    } else {
      setStorageList({
        url,
        toDo,
        inProgress,
        done,
      })
    }
  }, [url, toDo, inProgress, done])

  useEffect(() => {
    localStorage.setItem(url, JSON.stringify(storageList))
  }, [storageList, url])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      const list = Array.from(
        getList(source.droppableId as keyof ColumnListsProps)
      )
      const [removed] = list.splice(source.index, 1)
      list.splice(destination.index, 0, removed)
      setStorageList((prev) => ({
        ...prev,
        [source.droppableId]: list,
      }))
    } else {
      const sourceList = Array.from(
        getList(source.droppableId as keyof ColumnListsProps)
      )
      const destinationList = Array.from(
        getList(destination.droppableId as keyof ColumnListsProps)
      )
      const [removed] = sourceList.splice(source.index, 1)
      destinationList.splice(destination.index, 0, removed)
      setStorageList((prev) => ({
        ...prev,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }))
    }
  }

  const getList = (id: keyof ColumnListsProps): Issue[] => {
    return storageList[id] as Issue[]
  }
  console.log(url)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Row className="d-flex align-items-stretch mb-5">
          <Col className="d-flex" lg={4} sm={12}>
            <SingleColumn list={storageList.toDo} title="To Do" status="toDo" />
          </Col>
          <Col className="d-flex" lg={4} sm={12}>
            <SingleColumn
              list={storageList.inProgress}
              title="In Progress"
              status="inProgress"
            />
          </Col>
          <Col className="d-flex" lg={4} sm={12}>
            <SingleColumn list={storageList.done} title="Done" status="done" />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  )
}

export default ColumnLists
