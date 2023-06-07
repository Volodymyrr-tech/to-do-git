import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import ColumnLists from './Components/ColumnLists'
import InputRepo from './Components/InputRepo'
import {
  useGetStarsQuery,
  useGetIssuesQuery,
  useGetOpenAssigneeQuery,
  useGetClosedIssuesQuery,
} from './features/api/apiSlice'
import './styles/styles.css'

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://github.com/facebook/react')
  const urlParts = url.split('/')
  const owner = urlParts[3]
  const repo = urlParts[4]

  const { data: starsData, isLoading: starsLoading } = useGetStarsQuery({
    owner,
    repo,
  })
  const { data: toDo, isLoading: toDoLoading } = useGetIssuesQuery({
    owner,
    repo,
  })
  const { data: inProgress, isLoading: inProgressLoading } =
    useGetOpenAssigneeQuery({
      owner,
      repo,
    })
  const { data: done, isLoading: doneLoading } = useGetClosedIssuesQuery({
    owner,
    repo,
  })

  if (starsLoading || toDoLoading || inProgressLoading || doneLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  return (
    <>
      <div style={{ maxWidth: '70vw', margin: '0 auto' }}>
        <InputRepo setUrl={setUrl} url={url} stars={starsData} />
      </div>
      <div style={{ maxWidth: '70vw', margin: '0 auto' }}>
        <ColumnLists
          url={url}
          toDo={toDo}
          inProgress={inProgress}
          done={done}
        />
      </div>
    </>
  )
}

export default App
