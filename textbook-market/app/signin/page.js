"use client";

import { Formik, Form, Field } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Component() {
  const router = useRouter();

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/",
    });
    console.log(status);
    if (status.ok) router.push(status.url);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field type="text" name="username" placeholder="username" />
            {touched.username && <p>{errors.username}</p>}
            <Field type="password" name="password" placeholder="password" />
            {touched.password && <p>{errors.password}</p>}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
}
