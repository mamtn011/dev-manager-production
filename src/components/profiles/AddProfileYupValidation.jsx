import { Form, Row, Col, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormTextInput from "../shared/FormTextInput";

// schema for yap validation
const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^[a-z\s]+$/gi, { message: "Name must to be a string" })
    .required("First name is required")
    .min(3, "First name must to be 3 or more in length"),
  lastName: yup
    .string()
    .matches(/^[a-z\s]+$/gi, { message: "Name must to be a string" })
    .required("Last name is required")
    .min(3, "Last name must to be 3 or more in length"),
  email: yup
    .string()
    .required("Email must required")
    .email("Enter a valid email"),
  designation: yup
    .string()
    .matches(/^[a-z\s]+$/gi, { message: "Designation must to be a string" })
    .required("Designation is required")
    .min(3, "Designation must to be 3 or more in length"),
  bio: yup
    .string()
    .required("Bio is required")
    .min(10, "Bio must to be 10 or more in length")
    .max(100, "Bio must not to be 100 or more in length"),
  photo: yup
    .string()
    .required("Image url is required")
    .url("Enter a valid url"),
});

export default function AddProfileYupValidation({ profile }) {
  const { addProfile, editProfile } = useContext(ProfileContext);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    // for yup validation we have to pass this object in useForm hook
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  // reset after successfully submit
  useEffect(() => {
    isSubmitSuccessful &&
      reset({
        firstName: "",
        lastName: "",
        designation: "",
        email: "",
        dateOfBirth: new Date(),
        gender: "Male",
        bio: "",
        photo: "",
      });
  }, [isSubmitSuccessful]);

  // form submit
  const onSubmit = (data) => {
    const id = profile?.id || "";

    if (id) {
      editProfile(data, id);
    } else {
      // adding new profile
      addProfile(data);
    }
  };

  const defaultValue = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    designation: profile?.designation || "",
    email: profile?.email || "",
    dateOfBirth: new Date(),
    gender: profile?.gender || "Male",
    bio: profile?.bio || "",
    photo:
      profile?.photo ||
      "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  };

  const {
    firstName,
    lastName,
    designation,
    email,
    dateOfBirth,
    gender,
    bio,
    photo,
  } = defaultValue;
  const [birthYear, setBirthYear] = useState(
    dateOfBirth ? dateOfBirth : new Date()
  );
  // this is for date of birth (week-7.1.4)
  useEffect(() => {
    setValue("dateOfBirth", birthYear);
  }, [birthYear]);

  return (
    <>
      <h3 className="text-center">
        {profile?.id ? "Edit Profile" : "Add New Profile"}
      </h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* first name */}
        <FormTextInput
          name="firstName"
          label="First Name"
          type="text"
          defaultValue={firstName}
          register={register}
          errors={errors}
          placeholder="Enter First Name"
        />
        {/* last name */}
        <FormTextInput
          name="lastName"
          label="Last Name"
          type="text"
          defaultValue={lastName}
          register={register}
          errors={errors}
          placeholder="Enter Last Name"
        />
        {/* designation */}
        <FormTextInput
          name="designation"
          label="Profession"
          type="text"
          defaultValue={designation}
          register={register}
          errors={errors}
          placeholder="Enter Your Profession"
        />
        {/* image link */}
        <FormTextInput
          name="photo"
          label="Image Link"
          type="text"
          defaultValue={photo}
          register={register}
          errors={errors}
          placeholder="Enter Your Image Link"
        />
        {/* email */}
        <FormTextInput
          name="email"
          label="Email"
          type="email"
          defaultValue={email}
          register={register}
          errors={errors}
          placeholder="Enter Your Email"
        />
        {/* dateOfBirth */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" className="input-label">
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}>
            {/* react date picker...................... */}
            <DatePicker
              selected={birthYear}
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter your Date of Birth"
              maxDate={new Date()}
              onChange={(date) => setBirthYear(date)}
              showYearDropdown
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
              value="Male"
              defaultChecked={gender === "Male"}
              label="Male"
              {...register("gender")}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              value="Female"
              defaultChecked={gender === "Female"}
              label="Female"
              {...register("gender")}
            />
          </Col>
        </Form.Group>
        {/* bio */}
        <FormTextInput
          name="bio"
          label="Bio"
          type="text"
          as="textarea"
          defaultValue={bio}
          register={register}
          errors={errors}
          placeholder="Write somthing about you!"
        />
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}></Col>
          <Col sm={9}>
            <Button
              variant={profile?.id ? "warning" : "primary"}
              size="md"
              type="submit"
              disabled={isSubmitting ? "disabled" : ""}
            >
              {profile?.id ? "Update" : "Add Profile"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
