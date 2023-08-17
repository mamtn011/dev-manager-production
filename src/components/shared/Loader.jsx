import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return <Spinner className="d-block mx-auto my-auto" animation="grow" />;
}
