import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import qs from "qs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ADD, DELETE, UPDATE, LOADPROFILE } from "./action.type";
import { profileReducer } from "./reducer";
import { axiosPrivateInstance } from "../config/axios";
import { formateProfile } from "../lib/utilities";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // user from authContext
  const { user, token } = useContext(AuthContext);

  // declaring initial profiles
  const initialProfiles = [
    {
      id: "1",
      firstName: "Abul",
      lastName: "Hossen",
      email: "abhcd@gmail.com",
      designation: "Web Designer",
      gender: "Male",
      photo: "https://images.unsplash.com/photo-1513152697235-fe74c283646a",
      dateOfBirth: new Date(),
      bio: "Something about me",
    },
    {
      id: "2",
      firstName: "Abul",
      lastName: "Hossen",
      email: "abscd@gmail.com",
      designation: "Web Designer",
      gender: "Male",
      photo: "https://images.unsplash.com/photo-1609010697446-11f2155278f0",
      dateOfBirth: new Date(),
      bio: "Something about me",
    },
    {
      id: "3",
      firstName: "Abul",
      lastName: "Hossen",
      email: "abjcd@gmail.com",
      designation: "Web Designer",
      gender: "Male",
      photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      dateOfBirth: new Date(),
      bio: "Something about me",
    },
    {
      id: "4",
      firstName: "Abul",
      lastName: "Hossen",
      email: "abkcd@gmail.com",
      designation: "Web Designer",
      gender: "Male",
      photo: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
      dateOfBirth: new Date(),
      bio: "Something about me",
    },
  ];
  const navigate = useNavigate();
  // store profiles in state
  const [profiles, dispatch] = useReducer(profileReducer, initialProfiles);
  const [loaded, setLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  // load profiles from strapi
  useEffect(() => {
    (async () => {
      if (user) {
        await loadProfiles();
      }
    })();
  }, [user, pageNumber]);
  const loadProfiles = async () => {
    // query with pagination
    const query = qs.stringify(
      {
        sort: ["id:desc"],
        populate: "*",
        pagination: {
          page: pageNumber,
          pageSize: 2,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    try {
      const response = await axiosPrivateInstance(token).get(
        `/profiles?${query}`
      );
      const loadedProfiles = response.data.data.map((profile) =>
        formateProfile(profile)
      );
      dispatch({ type: LOADPROFILE, payload: loadedProfiles });
      setPageCount(response.data.meta.pagination.pageCount);
      setLoaded(true);
    } catch (err) {
      toast.error(err.response?.error?.details?.message);
    }
  };

  // delete profile click event handler
  const deleteProfile = async (id) => {
    try {
      const response = await axiosPrivateInstance(token).delete(
        `/profiles/${id}`
      );
      dispatch({ type: DELETE, payload: response.data.data.id });
      //show flash message
      toast.success("Profile Deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  // add profile function
  const addProfile = async (profile) => {
    profile = {
      author: user.id,
      ...profile,
    };
    try {
      const response = await axiosPrivateInstance(token).post("/profiles", {
        data: profile,
      });
      const formatedContact = formateProfile(response.data.data);
      dispatch({ type: ADD, payload: formatedContact });
      //show flash message
      toast.success("Profile added successfully!");
      navigate("/all-profiles");
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  // edit profile function
  const editProfile = (dataToUpdatet, id) => {
    dispatch({ type: UPDATE, payload: { dataToUpdatet, id } });
  };
  // search profiles function
  useEffect(() => {
    if (searchText) {
      (async () => {
        await findFrofilesBySearch();
      })();
    }
  }, [searchText]);
  const findFrofilesBySearch = async () => {
    // query for search using qs
    const query = qs.stringify(
      {
        filters: {
          $or: [
            {
              firstName: {
                $containsi: searchText,
              },
            },
            {
              lastName: {
                $containsi: searchText,
              },
            },
            {
              bio: {
                $containsi: searchText,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    try {
      const response = await axiosPrivateInstance(token).get(
        `/profiles?${query}`
      );
      setSearchResult(response.data);
      navigate("/search");
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const value = {
    profiles,
    loaded,
    editProfile,
    addProfile,
    deleteProfile,
    pageCount,
    pageNumber,
    setPageNumber,
    setSearchText,
    searchText,
    searchResult,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
