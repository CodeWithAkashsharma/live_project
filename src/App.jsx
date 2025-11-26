import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AuthForm from './pages/AuthForm'
import UserDash from './pages/UserDash'
import UserProfile from'./pages/UserProfile'
// import AdminDash from './pages/AdminDash'
// import ComplaintForm from './pages/CompaintForm'

function App() {
  
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDash />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    // <ComplaintForm></ComplaintForm>
    // <AdminDash></AdminDash>
  //  <AuthForm> </AuthForm>
  )
}

export default App
