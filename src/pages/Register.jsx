import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../components/shared/FormTextInput";
import { AuthContext } from "../context/AuthContext";

// schema for yap validation
const schema = yup.object({
  username: yup
    .string()
    .required("First name is required")
    .min(5, "Required and must to be 5 or more in length"),
  email: yup
    .string()
    .required("Email must required")
    .lowercase()
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.{6,})/,
      "Please enter strong password, minimum 6 char with 1 uppercase, 1 lowecase, 1 number, 1 special char"
    ),
  confirmpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password doesn't match"),
});

export default function Register() {
  const { userRegister } = useContext(AuthContext);
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    // for yup validation we have to pass this object in useForm hook
    resolver: yupResolver(schema),
  });
  // form submit
  const onSubmit = (data) => {
    const { username, email, password } = data;
    userRegister({
      username,
      email,
      password,
    });
  };
  return (
    <>
      <h3 className="text-center">Register</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* first name */}
        <FormTextInput
          name="username"
          label="User Name"
          type="text"
          defaultValue=""
          register={register}
          errors={errors}
          placeholder="Enter User Name"
        />

        {/* email */}
        <FormTextInput
          name="email"
          label="Email"
          type="email"
          defaultValue=""
          register={register}
          errors={errors}
          placeholder="Enter Your Email"
        />
        {/* password */}
        <FormTextInput
          name="password"
          label="Password"
          type="password"
          defaultValue=""
          register={register}
          errors={errors}
          placeholder="Enter Your password"
        />
        {/* confirm password */}
        <FormTextInput
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          defaultValue=""
          register={register}
          errors={errors}
          placeholder="Confirm Password"
        />
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}></Col>
          <Col sm={9}>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={isSubmitting ? "disabled" : ""}
            >
              Register
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
