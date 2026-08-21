import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { routes } from '../routes/routes'

function App() {
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