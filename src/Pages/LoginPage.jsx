import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formData);
      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
      });
    } else {
      console.log("Form validation failed.");
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="login-form"
      style={{
        backgroundColor: "#FFF",
        borderRadius: 6,
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        padding: "20px 10px",
      }}
    >
      <h1 style={{ color: "#868686", fontSize: "24px", textAlign: "center" }}>
        Login Form
      </h1>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isInvalid={formErrors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={formErrors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{ width: "100%" }}
        className="mt-3"
      >
        Submit
      </Button>
    </Form>
  );
};

export default LoginPage;
