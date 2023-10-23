import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { HomeContainer } from './containers'
import { store } from './store'

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  </React.StrictMode>,
)