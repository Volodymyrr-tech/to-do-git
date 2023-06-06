import { configureStore } from '@reduxjs/toolkit'
import api from '../features/api/apiSlice'
import gitReducer from '../features/gitList/gitListSlice'

//const reduxLogger = require('redux-logger')
//const logger = reduxLogger.createLogger()

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    gitList: gitReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
