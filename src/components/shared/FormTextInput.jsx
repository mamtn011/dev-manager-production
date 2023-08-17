import { Form, Row, Col } from "react-bootstrap";
export default function FormTextInput({
  name,
  label,
  type = "text",
  defaultValue = "",
  register,
  placeholder,
  errors,
  ...rest
}) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Col sm={3}>
        <Form.Label htmlFor={name} className="input-label">
          {label}
        </Form.Label>
      </Col>
      <Col sm={9}>
        <Form.Control
          type={type}
          id={name}
          defaultValue={defaultValue}
          // react-hook-form
          {...register(name)}
          className="input-text"
          // isInvalid from react bootstrap
          isInvalid={errors[name]}
          placeholder={placeholder}
          {...rest}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {/* showing error by optional chaining / (errors from useForm hook) */}
          {errors[name]?.message}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}
