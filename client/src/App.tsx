import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Other routes can be added here */}
    </Routes>
  </Router>
  )
}

export default App
