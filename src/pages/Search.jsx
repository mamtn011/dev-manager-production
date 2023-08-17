import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import Profile from "../components/profiles/Profile";

export default function Search() {
  const { searchResult, searchText } = useContext(ProfileContext);

  return (
    <>
      <h4 className="text-center">
        Searching for{" "}
        <span style={{ backgroundColor: "yellow", padding: "0px 5px" }}>
          {searchText}...
        </span>{" "}
      </h4>
      {searchResult && (
        <div style={{ display: "flex" }}>
          {searchResult.data.length > 0 ? (
            searchResult.data.map((profile) => (
              <Profile key={profile.id} profile={profile.attributes} />
            ))
          ) : (
            <h4>No result found!</h4>
          )}
        </div>
      )}
    </>
  );
}
