import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const OnboardingForm = props => {
  return (
    <Form>
      <Field type="text" name="name" placeholder="Name" />
      <Field type="email" name="email" placeholder="Email" />
      <Field type="password" name="password" placeholder="Password" />
      <label>
        <Field type="checkbox" name="tos" />
        Accept TOS
      </label>
      <button>Submit</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: values => {
    return {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      tos: values.tos || false
    };
  }
})(OnboardingForm);
