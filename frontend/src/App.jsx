import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { InterviewProvider } from "./interview.context";
import ProtectedRoute from "./services/ProtectedRoutes";

function App() {
  return (
    <InterviewProvider>
      <BrowserRouter>
        <Routes>

          {/* Login first */}
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview/:interviewId"
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </InterviewProvider>
  );
}

export default App;