import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../api/apiSlice'

const initialState = {
  obj: {
    url: null,
    stars: null,
    toDo: null,
    inProgress: null,
    done: null,
  },
}
const gitListSlice = createSlice({
  name: 'gitList',
  initialState,
  reducers: {
    updated: (state, action: PayloadAction<any>) => {
      state.obj = { ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getStars.matchFulfilled,
      (state, action) => {
        state.obj.stars = action.payload
      }
    )
    builder.addMatcher(
      api.endpoints.getIssues.matchFulfilled,
      (state, action) => {
        state.obj.toDo = action.payload
      }
    )
    builder.addMatcher(
      api.endpoints.getOpenAssignee.matchFulfilled,
      (state, action) => {
        state.obj.inProgress = action.payload
      }
    )
    builder.addMatcher(
      api.endpoints.getClosedIssues.matchFulfilled,
      (state, action) => {
        state.obj.done = action.payload
      }
    )
  },
})

export default gitListSlice.reducer
export const { updated } = gitListSlice.actions
