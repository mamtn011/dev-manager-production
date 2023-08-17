import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../components/shared/FormTextInput";
import { axiosInstance } from "../config/axios";
import { toast } from "react-toastify";

// schema for yap validation
const schema = yup.object({
  email: yup.string().required("Email must required"),
});

export default function ForgetPassword() {
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
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });
      toast.success("Password reset link sent to you email");
    } catch (err) {
      toast.error("Error in sending password reset link");
    }
  };
  return (
    <>
      <h3 className="text-center">Forgot Password?</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* email */}
        <FormTextInput
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          placeholder="Enter Your Email"
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
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
