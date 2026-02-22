import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/providers/UserProvider";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile/Profile";
import EditProfilePage from "./pages/Profile/EditProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/edit" element={<EditProfilePage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
