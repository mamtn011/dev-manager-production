import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Col, Row, ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import FormTextInput from "../shared/FormTextInput";
import { axiosPrivateInstance } from "../../config/axios";
import { toast } from "react-toastify";

// schema for yap validation
const schema = yup.object({
  fullName: yup
    .string()
    .required("First name is required")
    .min(5, "Required and must to be 5 or more in length"),
  profession: yup
    .string()
    .required("Email must required")
    .min(3, "Required and must to be 3 or more in length"),
  picture: yup
    .mixed()
    .required("Photo Required")
    .test("is-valid-type", "Photo Required", (value) => value.length > 0),
});
// function for getting upload percentage to show progress bar
const uploadPercentage = (total, loaded) => {
  return Math.floor(total / loaded) * 100;
};
export default function UserContactList() {
  const { user, token } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState(null);
  const [destructuredUserData, setdestructuredUserData] = useState({});
  const [loadedPercent, setLoadedPercent] = useState(0);

  const { username, email } = user;

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
    const { fullName, profession, picture } = data;
    const dataObj = {
      fullName: fullName,
      profession: profession,
      user: user.id,
    };
    const formData = new FormData();
    formData.append("files.picture", picture[0], picture[0].name);
    formData.append("data", JSON.stringify(dataObj));
    try {
      const response = await axiosPrivateInstance(token).post(
        "/user-profiles?populate=*",
        formData,
        {
          onUploadProgress: (progress) => {
            const percentage = uploadPercentage(
              progress.total,
              progress.loaded
            );
            setLoadedPercent(percentage);
          },
        }
      );
      toast.success("Data updated successfully");
    } catch (err) {
      console.log(err.response);
    }
  };
  // getting user data from server
  useEffect(() => {
    if (token) {
      (async () => {
        await getUserDataFromServer();
      })();
    }
  }, [token]);
  const getUserDataFromServer = async () => {
    try {
      const response = await axiosPrivateInstance(token).get(
        "/user-profiles?populate=*"
      );
      setUserData(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  // handle settings button
  const handleSettings = () => {
    setClicked(true);
  };
  // destructuring userData
  useEffect(() => {
    if (userData.data) {
      console.log(userData.data);
      const {
        attributes: {
          fullName,
          profession,
          picture: {
            data: {
              attributes: { url },
            },
          },
        },
      } = userData.data[userData.data.length - 1];
      setdestructuredUserData({
        fullName,
        profession,
        url,
      });
    }
  }, [userData]);

  return (
    <>
      {Object.keys(destructuredUserData).length && (
        <>
          <h4>Name: {destructuredUserData.fullName}</h4>
          <p>Email: {email}</p>
          <p>Profession: {destructuredUserData.profession}</p>
          <img
            src={destructuredUserData.url}
            alt=""
            width="300px"
            className="d-block mb-3"
          />
        </>
      )}
      {!clicked && (
        <Button type="submit" variant="primary" onClick={handleSettings}>
          Settings
        </Button>
      )}
      {clicked && (
        <>
          <h4 className="text-center">Account Settings</h4>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "600px", margin: "auto", padding: "20px 0" }}
          >
            {/* full name */}
            <FormTextInput
              name="fullName"
              label="Full Name"
              type="text"
              defaultValue=""
              register={register}
              errors={errors}
              placeholder="Enter Full Name"
            />

            {/* profession */}
            <FormTextInput
              name="profession"
              label="Profession"
              type="text"
              defaultValue=""
              register={register}
              errors={errors}
              placeholder="Enter Your Profession"
            />
            {/* picture */}
            <FormTextInput
              name="picture"
              label="Profile Picture"
              type="file"
              register={register}
              errors={errors}
              accept="image/*"
            />
            {isSubmitting && (
              <ProgressBar
                striped
                variant="success"
                className="mt-2"
                now={loadedPercent}
              />
            )}
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}></Col>
              <Col sm={9}>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isSubmitting ? "disabled" : ""}
                >
                  Save
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </>
      )}
    </>
  );
}
