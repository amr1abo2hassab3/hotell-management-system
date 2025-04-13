import { useFormik } from "formik";
import { DataUsersType } from "../../../interfaces/userTypes";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, users } from "../../../Api/Api";
import { toast } from "react-toastify";

interface UserEditProps {
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: DataUsersType;
}

interface EditValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

const EditUser = ({
  isOpenEdit,
  setIsOpenEdit,
  userDetails,
}: UserEditProps) => {
  const handleClose = (): void => {
    setIsOpenEdit(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<EditValues>({
    fullName: "",
    phoneNumber: "",
    email: "",
    role: "User",
  });
  const handleEditUserDetails = async (values: EditValues) => {
    setIsLoading(true);
    try {
      if (userDetails.id) {
        await axios.put(
          `${baseUrl}${users}/${userDetails.id}?id=${userDetails.id}`,
          values
        );
        toast.success(`Account has been Edited successfully`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          icon: false,
        });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<EditValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^(010|011|012|015)\d{8}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
    onSubmit: handleEditUserDetails,
  });

  useEffect(() => {
    if (userDetails) {
      setInitialValues({
        fullName: userDetails.fullName || "",
        phoneNumber: userDetails.phoneNumber || "",
        email: userDetails.email || "",
        role: userDetails.role || "User",
      });
    }
  }, [userDetails]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300
    ${
      isOpenEdit
        ? "opacity-100 scale-100 animate-fade-in"
        : "opacity-0 scale-90 pointer-events-none"
    }`}
    >
      <div className=" mx-auto md:min-w-[626px] md:min-h-[556px] w-[350px] bg-white p-8 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#202430] text-center">
            Edit user information{" "}
          </h2>
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
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
              htmlFor="role"
              className="block text-sm font-medium text-[#202430]"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              required
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="w-full duration-300 p-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#986D3C] transition-colors"
            >
              {isLoading ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Editing...
                </>
              ) : (
                " Edit User"
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

export default EditUser;
