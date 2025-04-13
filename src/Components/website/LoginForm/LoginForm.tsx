import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginValues } from "../../../interfaces/formAuthType";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import * as Yup from "yup";
import { baseUrl, LoginApi } from "../../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { AuthContextProps } from "../../../interfaces/authTypes";

function LoginForm() {
  const [serverErrors, setServerErrors] = useState<string>("" as string);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUserData } = useContext<AuthContextProps>(AuthContext);

  const handleSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}${LoginApi}`, values);
      setServerErrors("" as string);
      setUserData(res.data);
      if (rememberMe) {
        localStorage.setItem("userData", JSON.stringify(res.data));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(res.data));
      }
      setIsSuccess(true);

      toast.success(`Log in successfully`, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          setTimeout(() => {
            if (res.data.role == "User") navigate("/");
            else navigate("/dashboard");
            setTimeout(() => {
              toast.info(`Hello ${res.data.fullName} 👋!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                icon: false,
              });
            }, 500);
          }, 1000);
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerErrors(error.response?.data || "Something went wrong");
      } else {
        setServerErrors("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[\W_]/, "Password must have at least one special character")
        .required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            <input
              disabled={isLoading}
              autoComplete="current-password"
              type="password"
              name="password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm py-2 font-semibold">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-[#C49C74] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {serverErrors && (
            <p className="bg-red-100 font-semibold text-red-600 p-2 rounded-lg mt-2 list-disc list-inside">
              <span>{serverErrors}</span>
            </p>
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
              "Log In"
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#C49C74] hover:underline font-medium"
          >
            Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
