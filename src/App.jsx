import React from 'react'
import RockPaperScissors from './components/RockPaperScissors'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/rock_paper_scissor' element={<RockPaperScissors/>}/>
      </Routes>
    </div>
  )
}

export default App