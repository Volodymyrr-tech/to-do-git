export interface Issue {
  id: number
  title: string
  number: number
  created_at: string
  comments: number
  site_admin: boolean
}

interface IUser {
  login: string
  id: number
  avatar_url: string
  url: string
}

interface IRepository {
  id: number
  full_name: string
  owner: IUser
  stargazers_count: number
  forks_count: number
  open_issues_count: number
}

export interface IData {
  repository?: IRepository
  issues?: Issue[]
}

export interface IApiError {
  message: string
  statusCode: number
}

interface Stars {
  stargazers_count: number
}

export interface InputRepoProps {
  url: string
  setUrl: (url: string) => void
  stars: Stars
}

export interface ColumnListsProps {
  url: string
  toDo: Issue[]
  inProgress: Issue[]
  done: Issue[]
}

export interface SingleColumnProps {
  list: Issue[]
  title: string
  status: string
}
