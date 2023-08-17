import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../components/shared/FormTextInput";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axios";

// schema for yap validation
const schema = yup.object({
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

export default function ResetPassword() {
  //const { userRegister } = useContext(AuthContext);

  // getting code from the link using useSearchParams
  const [searchParam] = useSearchParams();
  const code = searchParam.get("code");
  const navigate = useNavigate();
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
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        code,
        password: data.password,
        passwordConfirmation: data.confirmpassword,
      });
      toast.success("Password resetted successfully");
      navigate("/login");
    } catch (err) {
      console.log(err.response);
      toast.error("Error in reset pasword");
    }
  };
  return (
    <>
      <h3 className="text-center">Reset Password</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* password */}
        <FormTextInput
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          placeholder="Enter new password"
        />
        {/* confirm password */}
        <FormTextInput
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          register={register}
          errors={errors}
          placeholder="Confirm new Password"
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
              Reset
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
