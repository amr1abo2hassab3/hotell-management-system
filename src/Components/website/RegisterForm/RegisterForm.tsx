import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { baseUrl, RegisterApi } from "../../../Api/Api";
import { useState } from "react";
import { RegisterValues, ServerErrors } from "../../../interfaces/formAuthType";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(
    [] as ServerErrors[]
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterValues) => {
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}${RegisterApi}`, values);
      setServerErrors([]);
      setIsSuccess(true);
      toast.success(`Account has been created successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        icon: false,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response?.data) {
        setServerErrors(
          Array.isArray(error.response.data) ? error.response.data : []
        );
        console.log(error?.response?.data);
      } else {
        setServerErrors([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<RegisterValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^(010|011|012|015)\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[\W_]/, "Password must have at least one special character")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <input
                disabled={isLoading}
                type="text"
                name="fullName"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
                placeholder="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm py-2 font-semibold ">
                  {formik.errors.fullName}
                </p>
              )}
            </div>
            <div>
              <input
                disabled={isLoading}
                type="tel"
                name="phone"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
                placeholder="Enter Mobile Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm py-2 font-semibold">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div>
              <input
                disabled={isLoading}
                autoComplete="username"
                type="email"
                name="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm py-2 font-semibold">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                {" "}
                <input
                  disabled={isLoading}
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fa-regular ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } absolute -translate-y-1/2 top-1/2 right-2 p-1 cursor-pointer text-[#ABADB7]`}
                ></i>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm py-2 font-semibold">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                {" "}
                <input
                  disabled={isLoading}
                  autoComplete="new-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <i
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`fa-regular ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  } absolute -translate-y-1/2 top-1/2  right-2 p-1 cursor-pointer text-[#ABADB7]`}
                ></i>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm py-2 font-semibold">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {Array.isArray(serverErrors) && serverErrors.length > 0 && (
              <ul className="bg-red-100 text-red-600 p-2 rounded-lg mt-2 list-disc list-inside">
                {serverErrors.map((err, index) => (
                  <li key={index}>{err.description}</li>
                ))}
              </ul>
            )}

            <button
              disabled={isLoading || isSuccess}
              type="submit"
              className={`w-full ${
                isLoading || (isSuccess && "cursor-not-allowed")
              } bg-[#C49C74] hover:bg-[#d99c60] text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center`}
            >
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Loading...
                </>
              ) : isSuccess ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <FaCheck className="text-green-600 text-2xl" />
                </motion.span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            have an account?{" "}
            <Link
              to={"/login"}
              className="text-[#C49C74] hover:text-[#C49C74] font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
