import { useFormik } from "formik";
import { baseUrl, services } from "../../../Api/Api";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

type AddNewServiceProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

type ServiceFormValues = {
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  backgroundImage: File | null;
  iconImage: File | null;
};

const AddNewService = ({ setIsOpen, isOpen }: AddNewServiceProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
    formik.resetForm();
    setBackgroundPreview(null);
    setIconPreview(null);
  };

  const formik = useFormik<ServiceFormValues>({
    initialValues: {
      serviceName: "",
      serviceDescription: "",
      servicePrice: 0,
      backgroundImage: null,
      iconImage: null,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("ServiceName", values.serviceName);
      formData.append("ServiceDescription", values.serviceDescription);
      formData.append("ServicePrice", values.servicePrice.toString());

      if (values.backgroundImage) {
        formData.append("BackgroundImage", values.backgroundImage);
      }

      if (values.iconImage) {
        formData.append("IconImage", values.iconImage);
      }

      try {
        await toast.promise(
          axios.post(`${baseUrl}${services}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            pending: "Adding Service...",
            success: "Service has been created successfully",
            error: "Failed to create Service",
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

        await queryClient.invalidateQueries({ queryKey: ["getAllServices"] });
        handleClose();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleBackgroundImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("backgroundImage", file);
      setBackgroundPreview(URL.createObjectURL(file));
    }
  };

  const handleIconImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("iconImage", file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full md:w-[626px] max-h-[90vh] overflow-auto bg-white p-8 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#202430]">Add New Service</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label
              htmlFor="serviceName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Name
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formik.values.serviceName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter service name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Service Price */}
          <div>
            <label
              htmlFor="servicePrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="servicePrice"
              name="servicePrice"
              value={formik.values.servicePrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Service Description */}
          <div>
            <label
              htmlFor="serviceDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="serviceDescription"
              name="serviceDescription"
              value={formik.values.serviceDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Background Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image
            </label>
            <div className="flex flex-wrap gap-4">
              <label
                htmlFor="background-upload"
                className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xs text-gray-500 text-center p-2">
                  {backgroundPreview
                    ? "Change background image"
                    : "Click to upload background"}
                </span>
                <input
                  id="background-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {backgroundPreview && (
              <div className="mt-4">
                <div className="relative w-full h-40 border rounded overflow-hidden group">
                  <img
                    src={backgroundPreview}
                    alt="background-preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("backgroundImage", null);
                      setBackgroundPreview(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition"
                    title="Remove image"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Icon Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Image
            </label>
            <div className="flex flex-wrap gap-4">
              <label
                htmlFor="icon-upload"
                className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xs text-gray-500 text-center p-2">
                  {iconPreview ? "Change icon image" : "Click to upload icon"}
                </span>
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleIconImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {iconPreview && (
              <div className="mt-4">
                <div className="relative w-24 h-24 border rounded overflow-hidden group">
                  <img
                    src={iconPreview}
                    alt="icon-preview"
                    className="w-full h-full object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("iconImage", null);
                      setIconPreview(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition"
                    title="Remove image"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#C4A484] text-white rounded-md hover:bg-[#a06427] focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-[#C4A484]"
            >
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Creating Service...
                </>
              ) : (
                "Create New Service"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewService;
