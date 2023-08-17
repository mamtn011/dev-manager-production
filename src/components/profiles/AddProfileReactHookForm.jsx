import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddProfileReactHookForm({ addProfile }) {
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // form submit
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-center">Add New by React Hook Form</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
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
              // react-hook-form with validation
              {...register("firstName", {
                required: "First name required",
                minLength: { value: 4, message: "Length must to be 4 or more" },
              })}
              className="input-text"
              // isInvalid from react bootstrap
              isInvalid={errors?.firstName}
              placeholder="Enter First Name"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {/* showing error by optional chaining / useForm hook */}
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* last name */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}
        {/* designation */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}
        {/* image link */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}
        {/* email */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}
        {/* dateOfBirth */}
        {/* <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" className="input-label">
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}> */}
        {/* <Form.Control
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleInputData}
              value={dateOfBirth}
              className="input-text"
              placeholder="Enter Your Date of Birth"
            /> */}

        {/* react date picker...................... */}
        {/* <DatePicker
              selected={dateOfBirth}
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter your Date of Birth"
              maxDate={new Date()}
              onChange={(date) =>
                setInputData({ ...inputData, dateOfBirth: date })
              }
              showYearDropdown
            />
          </Col>
        </Form.Group> */}
        {/* gender */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}

        {/* bio */}
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}

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
