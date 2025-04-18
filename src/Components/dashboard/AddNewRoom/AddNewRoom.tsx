import { useFormik } from "formik";
import { RoomType } from "../../../interfaces/roomTypes";
import { baseUrl, creatNewRoom, roomTypes } from "../../../Api/Api";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetAllServices from "../../../customHooks/useGetAllServices";
import { toast } from "react-toastify";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";
import { useState } from "react";

type AddNewRoomProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

type ValuesForm = {
  roomType: number;
  price: number;
  description: string;
  services: number[];
  status: string;
  classification: number;
  images: File[];
  isFeatured: boolean;
};

const AddNewRoom = ({ setIsOpen, isOpen }: AddNewRoomProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const formik = useFormik<ValuesForm>({
    initialValues: {
      roomType: 0,
      price: 0,
      description: "",
      services: [],
      status: "",
      classification: 5,
      images: [],
      isFeatured: false,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("RoomTypeId", values.roomType.toString());
      formData.append("RoomPrice", values.price.toString());
      formData.append("RoomDescription", values.description);
      formData.append("RoomStatus", values.status);
      formData.append("Classification", values.classification.toString());
      formData.append("ServiceIds", values.services.toString());
      values.images.forEach((img) => {
        formData.append("AdditionalRoomPictures", img);
      });

      try {
        await toast.promise(
          axios.post(`${baseUrl}${creatNewRoom}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            pending: "Adding Room...",
            success: "Room has been Created successfully",
            error: "Failed to Create Room",
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
        await queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
        handleClose();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleServiceToggle = (serviceId: number) => {
    const services = formik.values.services;
    const isSelected = services.includes(serviceId);
    formik.setFieldValue(
      "services",
      isSelected
        ? services.filter((id) => id !== serviceId)
        : [...services, serviceId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      formik.setFieldValue("images", [...formik.values.images, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const { data: dataRoomTypes, isLoading: isLoadingRoomTypes } = useQuery<
    RoomType[]
  >({
    queryKey: ["getAllTypeRoom"],
    queryFn: () => axios.get(`${baseUrl}${roomTypes}`).then((res) => res.data),
  });

  const { data: servicesData, isLoading: isLoadingServices } =
    useGetAllServices();

  if (isLoadingRoomTypes || isLoadingServices) return <LoaderScreen />;

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
          <h2 className="text-2xl font-bold text-[#202430]"> Add New Room</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-600 hover:text-gray-800  transition-all duration-200"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Room Type */}
          <div>
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={formik.values.roomType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select room type</option>
              {dataRoomTypes?.map((type) => (
                <option key={type.roomTypeId} value={type.roomTypeId}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Room Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Choose status</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Services
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
              {servicesData?.map((service) => (
                <div key={service.serviceId} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service.serviceId}`}
                    checked={formik.values.services.includes(service.serviceId)}
                    onChange={() => handleServiceToggle(service.serviceId)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`service-${service.serviceId}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {service.serviceName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Images
            </label>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((item) => (
                <label
                  key={item}
                  htmlFor={`image-upload-${item}`}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-xs text-gray-500 text-center p-2">
                    Click to upload
                  </span>
                  <input
                    id={`image-upload-${item}`}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {previewImages.map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded overflow-hidden group"
                >
                  <img
                    src={imgSrc}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // احذف الصورة من previews
                      const newPreviews = [...previewImages];
                      newPreviews.splice(index, 1);
                      setPreviewImages(newPreviews);

                      // احذف الصورة من formik.images
                      const newImages = [...formik.values.images];
                      newImages.splice(index, 1);
                      formik.setFieldValue("images", newImages);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs  transition"
                    title="Delete image"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Classification */}
          <div>
            <label
              htmlFor="classification"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Classification
            </label>
            <input
              type="number"
              id="classification"
              name="classification"
              value={formik.values.classification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={1}
              max={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Featured Room */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formik.values.isFeatured}
                onChange={() =>
                  formik.setFieldValue("isFeatured", !formik.values.isFeatured)
                }
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Room</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#C4A484] text-white rounded-md hover:bg-[#a06427] focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-[#C4A484]"
            >
              {isLoading ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Creating Room...
                </>
              ) : (
                "Create New Room"
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

export default AddNewRoom;
