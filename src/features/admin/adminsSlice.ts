import { createSlice } from '@reduxjs/toolkit'
import { Admin } from 'models'
import { fetchAdmins } from './fetchAdmins'
import { createAdmin } from './createAdmins'
import { RootState } from 'app/store'
import { fetchAdminById } from './fetchAdminById'

export interface AdminsState {
  admins: Admin[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}

const initialState = {
  admins: [],
  status: 'idle',
  error: '',
} as AdminsState

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAdmins.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.admins = action.payload
      state.status = 'succeeded'
    })

    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload?.message as string
    })

    // builder.addCase(createAdmin.pending, (state, action) => {
    //   state.status = 'pending'
    // })
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.admins.push(action.payload)
    })
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.error = action.payload?.message as string
    })

    builder.addCase(fetchAdminById.fulfilled, (state, action) => {
      state.admins = state.admins.map((admin) => {
        if (admin.id === action.payload.id) {
          return action.payload
        }
        return admin
      })
    })
  },
})

export const selectAdmins = (state: RootState) => state.admins

export default adminsSlice.reducer
