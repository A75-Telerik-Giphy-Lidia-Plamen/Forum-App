import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/providers/UserProvider";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import Authenticated from "./hoc/Authenticated";
import Browse from "./pages/Browse/Browse";
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
            <Route
              path="/profile/:id"
              element={
                <Authenticated>
                  <Profile />
                </Authenticated>
              }
            />
            <Route
              path="/posts"
              element={
                <Authenticated>
                  <Browse />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/create-post"
              element={
                <Authenticated>
                  <CreatePost />
                </Authenticated>
              }
            />
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
