import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../Api/Api";
import { verifyResetCode } from "./../../../Api/Api";
import { verifyResetCodeValues } from "../../../interfaces/authTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const FormVerify = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [messageSentCode, setMessageSentCode] = useState<string>("");
  const [tokenEmail, setTokenEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const values: verifyResetCodeValues = {
      token: tokenEmail,
      code: code,
    };
    try {
      const res = await axios.post(`${baseUrl}${verifyResetCode}`, values);
      setIsSuccess(true);
      setErrorMessage("");
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
        navigate("/new-password");
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

  useEffect(() => {
    const sotredSentCode = localStorage.getItem("sentcode");
    if (sotredSentCode) {
      const parsedSentCode = JSON.parse(sotredSentCode);
      setTokenEmail(parsedSentCode.token || "");
      setMessageSentCode(parsedSentCode.message || "");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4">
        {messageSentCode && (
          <p className="font-bold mb-2 capitalize text-green-600 text-xl pt-4 text-center">
            {messageSentCode}
          </p>
        )}

        <label
          htmlFor="verification-code"
          className="text-[14px] text-[#7C8493] mb-2 block"
        >
          Enter the code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="verification-code"
          disabled={isLoading}
          autoComplete="username"
          type="text"
          name="email"
          className="w-full p-4 border border-gray-300  focus:ring-2 focus:ring-[#C49C74] focus:border-[#C49C74] outline-none transition-all"
          placeholder="Enter the 6-digit verification code"
        />
        {errorMessage && (
          <p className="bg-red-100 my-2 text-center font-semibold text-red-600 p-2 rounded-lg mt-2 list-disc list-inside">
            <span>{errorMessage}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || code.length !== 6}
        className={`bg-[#C4A484] w-full flex items-center justify-center h-[40px] font-medium text-white ${
          code.length !== 6 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        {isLoading ? (
          <>
            Verifying... <i className="fa fa-spinner fa-spin mr-2"></i>
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
            <span className="ml-2"> success code </span>
          </>
        ) : (
          "Verify the code"
        )}
      </button>
    </form>
  );
};

export default FormVerify;
