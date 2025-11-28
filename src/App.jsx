import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthForm from './pages/AuthForm'
import UserDash from './pages/UserDash'
import UserProfile from'./pages/UserProfile'
import AdminDash from './pages/AdminDash'
import AdminProfile from "./pages/AdminProfile";
import LandingPage from "./pages/LandingPage";
import U_ComplaintDetail from "./pages/U_ComplaintDetail";
import A_ComplaintDetail from "./pages/A_ComplaintDetail";
import SuperAdmin from "./pages/SuperAdmin";

function App() {
  
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SuperAdmin/Dashboard" element={<SuperAdmin />} />
        <Route path="/User/ComplaintDetail" element={<U_ComplaintDetail />} />
        <Route path="/Admin/ComplainDetail" element={<A_ComplaintDetail />} />
        <Route path="/Login" element={<AuthForm/>} />
        <Route path="/User/Dashboard" element={<UserDash />} />
        <Route path="/Admin/Dashboard" element={<AdminDash />} />
        <Route path="/User/Profile" element={<UserProfile />} />
        <Route path="/Admin/Profile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
    // <ComplaintForm></ComplaintForm>
    // <AdminDash></AdminDash>
  //  <AuthForm> </AuthForm>
  )
}

export default App
