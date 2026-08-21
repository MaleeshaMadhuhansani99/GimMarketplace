import {useNavigate, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'
import {fetchListings, setSearch} from '../listingsSlice'
import SearchInput from '../../../components/search/SearchInput'

const ListingSearchContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {search, pagination} = useAppSelector((state) => state.listings)

  const runSearch = (searchValue: string) => {
    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search: searchValue.trim(),
        sort: 'newest',
        category: '',
        minPrice: '',
        maxPrice: '',
      }),
    )
  }

  const handleSearch = () => {
    const trimmedSearch = search.trim()
    runSearch(search)
    if (trimmedSearch !== '' && location.pathname !== '/') {
      navigate('/')
    }
  }

  const handleChange = (value: string) => {
    dispatch(setSearch(value))
    if (value.trim() === '' && location.pathname === '/') {
      runSearch('')
    }
  }

  return (
    <SearchInput
      value={search}
      onChange={handleChange}
      onSearch={handleSearch}
      placeholder="Search listings..."
      showSearchButton
    />
  )
}

export default ListingSearchContainer
