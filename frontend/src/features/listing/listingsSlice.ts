import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

import type {
  Category,
  Listing,
  PaginationProps,
  SortOption,
} from '../types/types'

import {
  createListing as createListingApi,
  getAllListings,
} from './listingsApi'

interface ListingsState {
  listings: Listing[]
  loading: boolean
  error: string | null
  pagination: PaginationProps
  search: string
  sort: SortOption
  category: Category | ''
  minPrice: number | ''
  maxPrice: number | ''
}

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
  search: '',
  sort: 'newest',
  category: '',
  minPrice: '',
  maxPrice: '',
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
}

// ===============================
// Fetch listings
// ===============================

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (
    {
      page,
      limit,
      search,
      sort,
      category,
      minPrice,
      maxPrice,
    }: {
      page: number
      limit: number
      search: string
      sort: SortOption
      category: Category | ''
      minPrice: number | ''
      maxPrice: number | ''
    },
    thunkAPI,
  ) => {
    try {
      return await getAllListings(
        page,
        limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch listings',
      )
    }
  },
)

// ===============================
// Create listing
// ===============================

export const createListingThunk =
  createAsyncThunk(
    'listings/createListing',
    async (
      formData: FormData,
      thunkAPI,
    ) => {
      try {
        return await createListingApi(
          formData,
        )
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error instanceof Error
            ? error.message
            : 'Failed to create listing',
        )
      }
    },
  )

// ===============================
// Slice
// ===============================

const listingsSlice = createSlice({
  name: 'listings',

  initialState,

  reducers: {
    setSearch: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.search = action.payload
    },

    setSort: (
      state,
      action: PayloadAction<SortOption>,
    ) => {
      state.sort = action.payload
    },

    setCategory: (
      state,
      action: PayloadAction<Category | ''>,
    ) => {
      state.category = action.payload
    },

    setMinPrice: (
      state,
      action: PayloadAction<number | ''>,
    ) => {
      state.minPrice = action.payload
    },

    setMaxPrice: (
      state,
      action: PayloadAction<number | ''>,
    ) => {
      state.maxPrice = action.payload
    },

    clearFilters: (state) => {
      state.category = ''
      state.minPrice = ''
      state.maxPrice = ''
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch listings
      // ===============================

      .addCase(
        fetchListings.pending,
        (state) => {
          state.loading = true
          state.error = null
        },
      )

      .addCase(
        fetchListings.fulfilled,
        (state, action) => {
          state.loading = false

          state.listings =
            action.payload.data

          state.pagination =
            action.payload.pagination
        },
      )

      .addCase(
        fetchListings.rejected,
        (state, action) => {
          state.loading = false

          state.error =
            action.payload as string
        },
      )

      // ===============================
      // Create listing
      // ===============================

      .addCase(
        createListingThunk.pending,
        (state) => {
          state.loading = true
          state.error = null
        },
      )

      .addCase(
        createListingThunk.fulfilled,
        (state) => {
          state.loading = false
          state.error = null
        },
      )

      .addCase(
        createListingThunk.rejected,
        (state, action) => {
          state.loading = false

          state.error =
            action.payload as string
        },
      )
  },
})

export const {
  setSearch,
  setSort,
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
} = listingsSlice.actions

export default listingsSlice.reducer