import { useState } from 'react'
import './App.css'
import ProfilPage from './assets/ProfilPage'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
