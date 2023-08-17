import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

export default function AddProfile({ addProfile }) {
  // initial data
  const initialData = {
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    dateOfBirth: new Date(),
    gender: "",
    bio: "",
    photo: "",
  };

  // storing data in state
  const [inputData, setInputData] = useState(initialData);

  const {
    firstName,
    lastName,
    designation,
    email,
    dateOfBirth,
    gender,
    bio,
    photo,
  } = inputData;

  // input change handler
  const handleInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    addProfile(inputData);
    setInputData(initialData);
  };

  return (
    <>
      <h3 className="text-center">Add New Profile</h3>
      <Form
        onSubmit={handleFormSubmit}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* first name */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="firstName" className="input-label">
              First Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInputData}
              value={firstName}
              className="input-text"
              placeholder="Enter First Name"
            />
          </Col>
        </Form.Group>
        {/* last name */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="lastName" className="input-label">
              Last Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleInputData}
              value={lastName}
              className="input-text"
              placeholder="Enter Last Name"
            />
          </Col>
        </Form.Group>
        {/* designation */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="designation" className="input-label">
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="designation"
              name="designation"
              onChange={handleInputData}
              value={designation}
              className="input-text"
              placeholder="Enter Your Profession"
            />
          </Col>
        </Form.Group>
        {/* image link */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="photo" className="input-label">
              Image Link
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="photo"
              name="photo"
              onChange={handleInputData}
              value={photo}
              className="input-text"
              placeholder="Enter Your Image Link"
            />
          </Col>
        </Form.Group>
        {/* email */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="email" className="input-label">
              Email
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="email"
              id="email"
              name="email"
              onChange={handleInputData}
              value={email}
              className="input-text"
              placeholder="Enter Your Email"
            />
          </Col>
        </Form.Group>
        {/* dateOfBirth */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" className="input-label">
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleInputData}
              value={dateOfBirth}
              className="input-text"
              placeholder="Enter Your Date of Birth"
            />
          </Col>
        </Form.Group>
        {/* gender */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label className="input-label">Gender</Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              id="male"
              name="gender"
              onChange={handleInputData}
              value="Male"
              label="Male"
              checked={gender === "Male"}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              id="female"
              name="gender"
              onChange={handleInputData}
              value="Female"
              label="Female"
              checked={gender === "Female"}
            />
          </Col>
        </Form.Group>

        {/* bio */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="bio" className="input-label">
              Bio
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as="textArea"
              type="text"
              id="bio"
              name="bio"
              onChange={handleInputData}
              value={bio}
              className="input-text"
              placeholder="Write somthing about you!"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}></Col>
          <Col sm={9}>
            <Button variant="primary" size="md" type="submit">
              Add Profile
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
