// eslint-disable-next-line react/prop-types
const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className="flex flex-col justify-center mx-auto w-1/2 h-full mt-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        // eslint-disable-next-line react/prop-types
        {...formik.getFieldProps(name)}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="mb-6">
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oh, snapp!</span>{" "}
            {formik.errors[name]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
