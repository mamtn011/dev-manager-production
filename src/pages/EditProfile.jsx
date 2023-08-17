import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import AddProfileYupValidation from "../components/profiles/AddProfileYupValidation";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";

export default function EditProfile() {
  const { profiles } = useContext(ProfileContext);
  const { id } = useParams();
  const foundProfile = profiles.find((profile) => profile.id === +id);
  return (
    <>
      {!foundProfile && <NotFound message="Sorry! 404 Profile Not Found." />}
      {foundProfile && <AddProfileYupValidation profile={foundProfile} />}
    </>
  );
}
