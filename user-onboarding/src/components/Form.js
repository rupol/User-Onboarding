import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Users from "./Users";

const OnboardingForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div>
      <Form>
        <div className="flex-container">
          {touched.name && errors.name && <p>{errors.name}</p>}
          <label htmlFor="name">Name:</label>
          <Field type="text" name="name" id="name" />
        </div>

        <div className="flex-container">
          {touched.email && errors.email && <p>{errors.email}</p>}
          <label htmlFor="email">Email:</label>
          <Field type="email" name="email" id="email" />
        </div>

        <div className="flex-container">
          {touched.password && errors.password && <p>{errors.password}</p>}
          <label htmlFor="password">Password:</label>
          <Field type="password" name="password" id="password" />
        </div>

        <div>
          {touched.tos && errors.tos && <p id="tos-error">{errors.tos}</p>}
          <Field type="checkbox" name="tos" id="tos" checked={values.tos} />
          <label htmlFor="tos">Accept Terms of Service</label>
        </div>
        <button type="submit">Sign Up</button>
      </Form>
      <Users users={users} />
    </div>
  );
};

export default withFormik({
  mapPropsToValues: ({ name, email, password, tos }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter a valid email"),
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password must be between 8 and 20 characters")
      .max(20, "Password must be between 8 and 20 characters"),
    tos: Yup.boolean().oneOf([true], "Please accept the Terms of Service")
  }),

  handleSubmit: (values, { setStatus }) => {
    axios
      .post("https://reqres.in/api/users_", values)
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }
})(OnboardingForm);
