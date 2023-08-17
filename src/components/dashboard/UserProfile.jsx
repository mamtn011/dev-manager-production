import React, { useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { ProfileContext } from "../../context/ProfileContext";
import { Link } from "react-router-dom";
export default function UserProfile() {
  const { userProfiles, userProfilesLoaded } = useContext(AuthContext);
  const { deleteProfile, editProfile } = useContext(ProfileContext);
  return (
    userProfilesLoaded && (
      <>
        <h3 className="text-center">User Profile List</h3>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Profession</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((profile, idx) => {
              const {
                id,
                firstName,
                lastName,
                email,
                designation,
                dateOfBirth,
              } = profile;
              return (
                <tr key={id}>
                  <td>{idx + 1}</td>
                  <td>{firstName + " " + lastName}</td>
                  <td>{designation}</td>
                  <td>{email}</td>
                  <td>{dateOfBirth}</td>
                  <td>
                    <Button as={Link} to={"/edit-profile/" + id}>
                      <FaEdit />
                    </Button>
                  </td>
                  <td>
                    <Button>
                      <FaRegTrashAlt onClick={() => deleteProfile(id)} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    )
  );
}
