import {configureStore} from '@reduxjs/toolkit'
import UpdateReducer from './UpdatePosition';


export default configureStore({
  reducer: {
    updateData:UpdateReducer,
  },
})