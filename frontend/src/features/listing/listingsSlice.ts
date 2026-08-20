import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
  Listing,
  PaginationProps,
} from '../types/types'
import { getAllListings } from './listingsApi'

interface ListingsState {
  listings: Listing[]
  loading: boolean
  error: string | null
  pagination: PaginationProps
}

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
}

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (
    { page, limit }: { page: number; limit: number },
    thunkAPI,
  ) => {
    try {
      return await getAllListings(page, limit)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch listings',
      )
    }
  },
)

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false

        state.listings = action.payload.data
        state.pagination = action.payload.pagination
      })

      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default listingsSlice.reducer