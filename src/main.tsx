import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import routes from './router/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Provider>
  </StrictMode>,
)
