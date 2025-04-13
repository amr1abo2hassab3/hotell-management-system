import axios from "axios";
import { useFormik } from "formik";
import { UserTypeAdd } from "../../../interfaces/userTypes";
import * as Yup from "yup";
import { useState } from "react";
import { addUser, baseUrl } from "../../../Api/Api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { ServerErrors } from "../../../interfaces/formAuthType";

type AddUserFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const AddUserForm = ({ setIsOpen, isOpen }: AddUserFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(
    [] as ServerErrors[]
  );

  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handelAddUser = async (values: UserTypeAdd): Promise<void> => {
    setIsLoading(true);
    try {
      setServerErrors([]);
      await toast.promise(
        axios.post(`${baseUrl}${addUser}`, values),
        {
          pending: "Adding account...",
          success: "Account has been Added successfully",
          error: "Failed to Add account",
        },
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      await queryClient.invalidateQueries({ queryKey: ["GetAllUsers"] });
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        setServerErrors(
          Array.isArray(error.response.data) ? error.response.data : []
        );
      } else {
        setServerErrors([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<UserTypeAdd>({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: "User",
    },
    onSubmit: handelAddUser,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^(010|011|012|015)\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[\W_]/, "Password must have at least one special character")
        .required("Password is required"),
    }),
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className=" mx-auto md:min-w-[626px] md:min-h-[636px] w-[350px] bg-white p-8 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#202430]">Add New User</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-600 hover:text-gray-800  transition-all duration-200"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#202430]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter full name"
              required
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm py-2 font-semibold ">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-[#202430]"
            >
              Phone Number
            </label>
            <input
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter phone number"
              required
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-sm py-2 font-semibold ">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#202430]"
            >
              Email
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter user's email"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm py-2 font-semibold ">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#202430]"
            >
              Password
            </label>
            <div className="relative">
              {" "}
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
                placeholder="Enter password"
                required
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`fa-regular ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } absolute -translate-y-1/2 top-1/2 right-2 p-1 cursor-pointer text-[#ABADB7]`}
              ></i>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm py-2 font-semibold ">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#202430]"
            >
              Role
            </label>
            <select
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="role"
              name="role"
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {Array.isArray(serverErrors) && serverErrors.length > 0 && (
            <ul className="bg-red-100 text-red-600 p-2 rounded-lg mt-2 list-disc list-inside">
              {serverErrors.map((err, index) => (
                <li key={index}>{err.description}</li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="w-full duration-300 p-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#986D3C] transition-colors"
            >
              {isLoading ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Adding...
                </>
              ) : (
                " Add User"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-20 p-3 ml-4 bg-red-400 duration-300  text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
