import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { Card, ListGroup, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import {
  FaEnvelope,
  FaMale,
  FaCalendarDay,
  FaRegTrashAlt,
  FaEdit,
} from "react-icons/fa";

export default function SingleProfile() {
  const { profiles, deleteProfile } = useContext(ProfileContext);
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const foundProfile = profiles.find((profile) => profile.id === +id);

  useEffect(() => {
    if (id && foundProfile) {
      setProfile(foundProfile);
    }
  }, [id]);

  const {
    firstName,
    lastName,
    email,
    gender,
    photo,
    bio,
    designation,
    dateOfBirth,
  } = profile;

  const navigate = useNavigate();
  const handleDelete = () => {
    deleteProfile(id);
    navigate("/all-profiles");
  };
  return (
    <>
      {Object.keys(profile).length === 0 && (
        <NotFound message="Sorry! 404 Profile Not Found." />
      )}
      {Object.keys(profile).length > 0 && (
        <Card className="m-2 text-center">
          <Card.Img
            style={{ width: "300px", height: "270px", margin: "auto" }}
            variant="top"
            src={photo}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>{firstName + " " + lastName}</Card.Title>
            <Card.Subtitle className="designation">{designation}</Card.Subtitle>
            <Card.Text>{bio}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <FaMale className="fa-icon" />
              {gender}
            </ListGroup.Item>
            <ListGroup.Item>
              <FaCalendarDay className="fa-icon" />
              {dateOfBirth instanceof Object
                ? format(dateOfBirth, "dd/MM/yyyy")
                : dateOfBirth}
            </ListGroup.Item>
            <ListGroup.Item>
              <FaEnvelope className="fa-icon" /> {email}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Body className="view-delete-link">
              <Button
                as={Link}
                to={"/edit-profile/" + id}
                className="view-delete-btn view-btn"
              >
                <FaEdit className="fa-icon view" />
              </Button>
              <Button className="view-delete-btn delete-btn">
                <FaRegTrashAlt
                  className="fa-icon delete"
                  onClick={() => handleDelete(id)}
                />
              </Button>
            </Card.Body>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
