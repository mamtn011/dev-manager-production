import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../../config/axios";
import FormTextInput from "../shared/FormTextInput";
import { AuthContext } from "../../context/AuthContext";

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

export default function ManagePassword() {
  const { token } = useContext(AuthContext);
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
      const response = await axiosPrivateInstance(token).post(
        "/auth/change-password",
        {
          currentPassword: data.carrentpassword,
          password: data.password,
          passwordConfirmation: data.confirmpassword,
        }
      );
      toast.success("Password Changed successfully");
    } catch (err) {
      console.log(err.response);
      toast.error("Error in change password");
    }
  };
  return (
    <>
      <h3 className="text-center">Manage Password</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", margin: "auto", padding: "20px 0" }}
      >
        {/* current password */}
        <FormTextInput
          name="carrentpassword"
          label="Current Password"
          type="password"
          register={register}
          errors={errors}
          placeholder="Enter your current password"
        />
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
              Change
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
