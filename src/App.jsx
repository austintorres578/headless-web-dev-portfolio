import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import IndividualProject from './pages/IndividualProject'
import Contact from './pages/Contact'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/projects/projectName' element={<IndividualProject/>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App