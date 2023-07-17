import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import { Link, withRouter } from "react-router-dom";
import { signupUser } from "../services/signupServices";
import { useState } from "react";
import { useAuthActions } from "../Provider/AuthProvider";
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )
  passwordConfirm: Yup.string()
    .required("Pasword Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = ({ history }) => {
  const setAuth=useAuthActions();
  console.log(history);
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = {
      name,
      email,
      password,
      phoneNumber,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      // localStorage.setItem('authstate',JSON.stringify(data));
      setError(null);
      history.push("/");
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
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password confirmation"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full flex justify-center mx-auto sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
        >
          Signup
        </button>
        {error && <p className="flex justify-center text-red-600">{error}</p>}
        {/* {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already login?</p>
        </Link> */}
        <Link to="/login" className={"mx-auto flex justify-center mt-4"}>
          Already Login?
        </Link>
      </form>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(SignupForm);
