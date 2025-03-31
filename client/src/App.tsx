import LandingPage from "./pages/LandingPage"
import MainPage from "./pages/MainPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<MainPage />} />
      {/* Other routes can be added here */}
    </Routes>
  </Router>
  )
}

export default App
