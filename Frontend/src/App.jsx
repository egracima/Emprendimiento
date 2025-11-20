import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Registro"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    </Router>
    )
}

export default App