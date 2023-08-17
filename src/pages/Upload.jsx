import React, { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { axiosInstance } from "../config/axios";
import axios from "axios";

const uploadPercentage = (total, loaded) => {
  return Math.floor(total / loaded) * 100;
};
export default function Upload() {
  const [file, setFile] = useState(null);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState(null);
  // onchabge handeler .........................
  const handleChange = (evt) => {
    setFile(evt.target.files[0]);
    setSubmitted(false);
  };
  // submit handler ............................
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // FormData is a global function attached with browsers.
    const formData = new FormData();
    formData.append("files", file);
    try {
      setSubmitted(true);
      const response = await axios("http://localhost:1337/api/upload", {
        method: "POST",
        data: formData,
        // onUploadProgress is for calculate how mutch the file uploaded
        // this function take a parameter which is an object with total and loaded property
        onUploadProgress: (progress) => {
          const percentage = uploadPercentage(progress.total, progress.loaded);
          setLoadedPercent(percentage);
        },
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="d-block"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Button className="mt-3" type="submit" variant="primary">
          Upload
        </Button>
      </form>
      {submitted && (
        <ProgressBar
          striped
          variant="success"
          className="mt-2"
          now={loadedPercent}
        />
      )}
    </div>
  );
}
