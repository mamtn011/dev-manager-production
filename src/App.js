import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Profiles from "./pages/Profiles";
import Home from "./pages/Home";
import AddNewProfile from "./pages/AddNewProfile";
import EditProfile from "./pages/EditProfile";
import SingleProfile from "./pages/SingleProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/shared/Header";
import PrivetRoute from "./routes/PrivetRoute";
import PublicRoute from "./routes/PublicRoute";
import UserProfile from "./components/dashboard/UserProfile";
import ManagePassword from "./components/dashboard/ManagePassword";
import UserContactList from "./components/dashboard/UserContactList";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header />
      <Container className="pt-2">
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="all-profiles"
            element={
              <PrivetRoute>
                <Profiles />
              </PrivetRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivetRoute>
                <Dashboard />
              </PrivetRoute>
            }
          >
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="manage-password" element={<ManagePassword />} />
            <Route path="user-contacts" element={<UserContactList />} />
          </Route>

          <Route
            path="add-new"
            element={
              <PrivetRoute>
                <AddNewProfile />
              </PrivetRoute>
            }
          />
          <Route
            path="edit-profile/:id"
            element={
              <PrivetRoute>
                <EditProfile />
              </PrivetRoute>
            }
          />
          <Route
            path="single-profile/:id"
            element={
              <PrivetRoute>
                <SingleProfile />
              </PrivetRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="upload"
            element={
              <PrivetRoute>
                <Upload />
              </PrivetRoute>
            }
          />
          <Route
            path="search"
            element={
              <PrivetRoute>
                <Search />
              </PrivetRoute>
            }
          />
          <Route
            path="forget-password"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={<NotFound message="Sorry! 404 Page Not Found." />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
