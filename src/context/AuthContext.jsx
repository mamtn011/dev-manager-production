import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance, axiosPrivateInstance } from "../config/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const loadedUser = JSON.parse(localStorage.getItem("user"));
  const loadedToken = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(loadedUser ? loadedUser : null);
  const [token, setToken] = useState(loadedToken ? loadedToken : null);
  const [userProfiles, setUserProfiles] = useState(null);
  const [userProfilesLoaded, setUserProfilesLoaded] = useState(false);
  const navigate = useNavigate();
  // register function
  const userRegister = async (dataToRegister) => {
    try {
      const response = await axiosInstance.post(
        "/auth/local/register",
        dataToRegister
      );
      const { user, jwt } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));
      setUser(user);
      setToken(jwt);
      toast.success("Registration successfull!");
      navigate("/all-profiles");
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  // login function
  const login = async (dataToLogin) => {
    try {
      const response = await axiosInstance.post("/auth/local", dataToLogin);
      const { user, jwt } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));
      setUser(user);
      setToken(jwt);
      toast.success("Login successfull!");
      navigate(location?.state?.from ? location.state.from : "/all-profiles");
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  // logout function
  const logout = () => {
    setUserProfiles(null);
    setUserProfilesLoaded(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.warning("Logout successfull!");
    navigate("/login");
  };
  // load user created profiles from server
  useEffect(() => {
    if (token) {
      (async () => {
        const data = await loadUserProfiles();
        setUserProfiles(data);
      })();
    }
  }, [token]);

  const loadUserProfiles = async () => {
    try {
      const response = await axiosPrivateInstance(token).get(
        "/users/me?populate=profiles"
      );
      //console.log(response.data?.profiles);
      setUserProfilesLoaded(true);
      return response.data?.profiles;
    } catch (err) {
      //console.log(err.response.data);
      setUserProfilesLoaded(true);
    }
  };
  const value = {
    user,
    token,
    userRegister,
    login,
    logout,
    userProfiles,
    userProfilesLoaded,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
