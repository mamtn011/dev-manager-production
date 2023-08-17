import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../components/shared/FormTextInput";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

// schema for yap validation
const schema = yup.object({
  email: yup.string().required("Email must required"),
  password: yup.string().required("Password required"),
});

export default function Login() {
  const { login } = useContext(AuthContext);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // for yup validation we have to pass this object in useForm hook
    resolver: yupResolver(schema),
  });
  // form submit
  const onSubmit = (data) => {
    const { email, password } = data;
    login({
      identifier: email,
      password,
    });
  };
  return (
    <>
      <h3 className="text-center">Login</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
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
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}></Col>
          <Col sm={9}>
            <p>
              Forgot Password? <Link to="/forget-password">Click</Link>
            </p>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={isSubmitting ? "disabled" : ""}
            >
              Login
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
