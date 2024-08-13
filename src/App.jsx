import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Background from './components/Background'
import InputShortener from './components/Links/InputShortener'
import ResultLink from './components/Links/ResultLink'
import RedirectPage from './components/Links/RedirectPage'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Background />
        <Routes>
          <Route path='/' element={
            <>
              <InputShortener />
              <ResultLink />
            </>
          } />
          <Route path='/:uniqueID' element={<RedirectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
