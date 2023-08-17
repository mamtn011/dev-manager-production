import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ADD, DELETE, LOADPROFILE, UPDATE } from "./action.type";

// reducer for ProfileContext
export const profileReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // load profiles from server
    case LOADPROFILE:
      return [...payload];
    // add new profile
    case ADD:
      const profileToAdd = {
        id: uuidv4(),
        ...payload,
      };
      return [profileToAdd, ...state];
    // edit profile
    case UPDATE:
      const { dataToUpdatet, id } = payload;
      const profilesAfterEdit = state.map((profile) => {
        if (profile.id === id) {
          return {
            ...profile,
            ...dataToUpdatet,
          };
        } else {
          return profile;
        }
      });
      return [...profilesAfterEdit];
    // delete profile
    case DELETE:
      const remainProfiles = state.filter((el) => el.id !== payload);
      return [...remainProfiles];
    default:
      return state;
  }
};
