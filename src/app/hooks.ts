import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

//it's a convention to create new file in app folder to define useAppSelector and useAppDispatch
