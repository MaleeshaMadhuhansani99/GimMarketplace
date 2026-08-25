import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { routes } from '../routes/routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { checkAuthThunk } from '../features/auth/authSlice'

function App() {
  const dispatch = useAppDispatch()
  const { initializing } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkAuthThunk())
  }, [dispatch])

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <Layout>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  )
}

export default App