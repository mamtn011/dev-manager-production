import React, { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { Card, ListGroup, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaMale,
  FaCalendarDay,
  FaRegTrashAlt,
  FaEye,
} from "react-icons/fa";

export default function Profile({ profile }) {
  const { deleteProfile } = useContext(ProfileContext);
  const {
    id,
    firstName,
    lastName,
    email,
    gender,
    photo,
    bio,
    designation,
    dateOfBirth,
  } = profile;
  return (
    <Card style={{ width: "18rem" }} className="m-2">
      <Card.Img variant="top" src={photo} className="card-img" />
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
            to={"/single-profile/" + id}
            className="view-delete-btn"
          >
            <FaEye className="fa-icon view" />
          </Button>
          {/* <Button className="view-delete-btn delete-btn">
            <FaRegTrashAlt
              className="fa-icon delete"
              onClick={() => deleteProfile(id)}
            />
          </Button> */}
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
