import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "./../services/loginServices";
import { useAuth, useAuthActions } from "../Provider/AuthProvider";
import { useQuery } from "../hooks/useQuery";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )
});

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const LoginForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const auth = useAuth();
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);
  const setAuth = useAuthActions();

  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      // localStorage.setItem('authstate',JSON.stringify(data));
      // eslint-disable-next-line react/prop-types
      history.push(redirect);
      setError(null);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.data.message)
        setError(error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />

        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />

        <button
          type="submit"
          disabled={!formik.isValid}
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full flex justify-center mx-auto sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
        >
          Login
        </button>
        {error && <p className="flex justify-center text-red-600">{error}</p>}
        {/* {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already login?</p>
        </Link> */}
        <Link
          to={`/signup?redirect=${redirect}`}
          className={"mx-auto flex justify-center mt-4"}
        >
          Not Signup yet?
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
