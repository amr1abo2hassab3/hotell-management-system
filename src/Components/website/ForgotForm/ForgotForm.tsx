import { useFormik } from "formik";
import { useState } from "react";
import { ForgotValues } from "../../../interfaces/formAuthType";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { baseUrl, forgotPassword } from "../../../Api/Api";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (values: ForgotValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}${forgotPassword}`, values);
      setIsSuccess(true);
      setErrorMessage("");
      localStorage.setItem("sentcode", JSON.stringify(res.data));
      toast.success(`${res.data.message}`, {
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
        navigate("/verify");
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage("حدث خطأ غير متوقع.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<ForgotValues>({
    initialValues: {
      email: "",
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-4">
        <label
          htmlFor="email"
          className="text-[14px] text-[#7C8493] mb-2 block"
        >
          Email
        </label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          disabled={isLoading}
          autoComplete="username"
          type="email"
          name="email"
          className="w-full p-4 border border-gray-300  focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
          placeholder="Enter Your Email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm py-2 font-semibold">
            {formik.errors.email}
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="bg-red-100 my-2 text-center font-semibold text-red-600 p-2 rounded-lg mt-2 list-disc list-inside">
          <span>{errorMessage}</span>
        </p>
      )}
      <button
        disabled={isLoading || isSuccess}
        type="submit"
        className="bg-[#C4A484] text-center flex items-center justify-center w-full h-[40px] font-medium text-white"
      >
        {isLoading ? (
          <>
            <i className="fa fa-spinner fa-spin mr-2"></i>
            Loading...
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
            <span className="ml-2"> success</span>
          </>
        ) : (
          "Send reset link"
        )}
      </button>
    </form>
  );
};

export default ForgetForm;
