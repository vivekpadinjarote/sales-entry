import { useState } from 'react'
import './App.css'
import HeaderForm from './features/header/headerForm'
import DetailForm from './features/detail/detailForm'
import ButtonList from './components/buttonList'

function App() {

  return (
    <>
    <div className='super-container'>
      <ButtonList />
      <HeaderForm />
      <hr/>
      <DetailForm />
    </div>
    </>
  )
}

export default App
