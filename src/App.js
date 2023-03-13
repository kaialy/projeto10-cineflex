import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./assets/styles/GlobalStyle"
import NavBar from "./components/NavBar/NavBar"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

function App() {
  const [successInfo, setSuccessInfo] = useState({})

  return (
    <BrowserRouter>
      <GlobalStyle />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sessoes/:idFilme" element={<SessionsPage />}/>
        <Route path="/assentos/:idSessao" element={<SeatsPage setSuccessInfo={setSuccessInfo}/>}/>
        <Route path="/sucesso" element={<SuccessPage successInfo={successInfo}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
