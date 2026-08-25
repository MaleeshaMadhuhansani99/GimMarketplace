import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User, SignupPayload, LoginPayload } from './types/auth.types'
import * as authApi from './authApi'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  initializing: boolean 
  loading: boolean       
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  initializing: true,
  loading: false,
  error: null,
}

export const checkAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      return await authApi.getCurrentUser()
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload: SignupPayload, thunkAPI) => {
    try {
      return await authApi.signup(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Failed to sign up',
      )
    }
  },
)

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, thunkAPI) => {
    try {
      return await authApi.login(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Failed to log in',
      )
    }
  },
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authApi.logout()
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Failed to log out',
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.initializing = true
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.initializing = false
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.initializing = false
      })
      .addCase(signupThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer