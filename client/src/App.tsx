import LandingPage from "./pages/LandingPage"
import MainPage from "./pages/MainPage"
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<MainPage />} />
      {/* Other routes can be added here */}
    </Routes>
  )
}

export default App
