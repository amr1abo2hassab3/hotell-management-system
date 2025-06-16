import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { resetValues } from "../../../interfaces/authTypes";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl, resetPassword } from "../../../Api/Api";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: resetValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}${resetPassword}`, values);
      setIsSuccess(true);
      localStorage.removeItem("sentcode");
      toast.success(`${res.data}`, {
        position: "top-center",
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
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<resetValues>({
    initialValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[\W_]/, "Password must have at least one special character")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const sotredSentCode = localStorage.getItem("sentcode");
    if (sotredSentCode) {
      const parsedSentCode = JSON.parse(sotredSentCode);
      formik.setFieldValue("token", parsedSentCode.token);
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-4">
        <label
          htmlFor="newPassword"
          className="text-[14px] text-[#7C8493] mb-2 block"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            autoComplete="new-password"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            className="w-full p-4 border border-gray-300 focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
            placeholder="Enter your password."
          />

          <i
            onClick={() => setShowPassword(!showPassword)}
            className={`fa-regular ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } absolute -translate-y-1/2 top-1/2 right-2 p-1 cursor-pointer text-[#ABADB7]`}
          ></i>
        </div>
        {formik.touched.newPassword && formik.errors.newPassword && (
          <p className="text-red-500 text-sm py-2 font-semibold">
            {formik.errors.newPassword}
          </p>
        )}
      </div>

      <div className="my-4">
        <label
          htmlFor="confirmPassword"
          className="text-[14px] text-[#7C8493] mb-2 block"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="confirmPassword"
            disabled={isLoading}
            autoComplete="new-password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            className="w-full p-4 border border-gray-300 focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
            placeholder="Re-enter your password to verify."
          />

          <i
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`fa-regular ${
              showConfirmPassword ? "fa-eye" : "fa-eye-slash"
            } absolute -translate-y-1/2 top-1/2  right-2 p-1 cursor-pointer text-[#ABADB7]`}
          ></i>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm py-2 font-semibold">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-[#C4A484] w-full flex items-center justify-center h-[40px] font-medium text-white `}
      >
        {isLoading ? (
          <>
            reseting password... <i className="fa fa-spinner fa-spin mr-2"></i>
          </>
        ) : isSuccess ? (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <FaCheck className="text-green-600 text-2xl" />
            </motion.span>
            <span className="ml-2"> reseted password successfully </span>
          </>
        ) : (
          "Verify the code"
        )}
      </button>
    </form>
  );
};

export default NewPasswordForm;
