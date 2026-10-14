import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Beranda } from './pages/Beranda'
import { Tugas } from './pages/Tugas'
import { Timer } from './pages/Timer'
import {Layout} from './components/Layout'
import { InputTugas } from './pages/InputTugas'

function App() {
  return (
    <main>
      <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Beranda />} />
          <Route path="/Tugas" element={<Tugas />} />
          <Route path="/InputTugas" element={<InputTugas />} />
          <Route path="/Timer" element={<Timer />} />
        </Route>
      </Routes>
    </Router>
    </main>
  )
}

export default App;
