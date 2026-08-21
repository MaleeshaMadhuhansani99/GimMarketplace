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
} from '../types/listing.types'

import {
  createListing as createListingApi,
  deleteListing as deleteListingApi,
  getAllListings,
} from './listingsApi'

interface ListingsState {
  listings: Listing[]
  loading: boolean
  error: string | null
  deleting: boolean
  deleteError: string | null
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
  deleting: false,
  deleteError: null,
  search: '',
  sort: 'newest',
  category: '',
  minPrice: '',
  maxPrice: '',
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
}

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

export const createListingThunk = createAsyncThunk(
  'listings/createListing',
  async (formData: FormData, thunkAPI) => {
    try {
      return await createListingApi(formData)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to create listing',
      )
    }
  },
)


export const deleteListingThunk = createAsyncThunk(
  'listings/deleteListing',
  async (id: number, thunkAPI) => {
    try {
      await deleteListingApi(id)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to delete listing',
      )
    }
  },
)

const listingsSlice = createSlice({
  name: 'listings',

  initialState,

  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },

    setSort: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload
    },

    setCategory: (state, action: PayloadAction<Category | ''>) => {
      state.category = action.payload
    },

    setMinPrice: (state, action: PayloadAction<number | ''>) => {
      state.minPrice = action.payload
    },

    setMaxPrice: (state, action: PayloadAction<number | ''>) => {
      state.maxPrice = action.payload
    },

    clearFilters: (state) => {
      state.category = ''
      state.minPrice = ''
      state.maxPrice = ''
    },

    clearDeleteError: (state) => {
      state.deleteError = null
    },
  },

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

      .addCase(createListingThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createListingThunk.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(createListingThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(deleteListingThunk.pending, (state) => {
        state.deleting = true
        state.deleteError = null
      })
      .addCase(deleteListingThunk.fulfilled, (state, action) => {
        state.deleting = false
        state.listings = state.listings.filter(
          (listing) => listing.id !== action.payload,
        )
      })
      .addCase(deleteListingThunk.rejected, (state, action) => {
        state.deleting = false
        state.deleteError = action.payload as string
      })
  },
})

export const {
  setSearch,
  setSort,
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
  clearDeleteError,
} = listingsSlice.actions

export default listingsSlice.reducer