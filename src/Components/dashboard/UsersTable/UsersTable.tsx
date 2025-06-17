import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import { baseUrl, searchByEmail, users } from "../../../Api/Api";
import { useEffect, useState } from "react";
import LoaderDashboard from "../LoaderDashboard/LoaderDashboard";
import { ClipLoader } from "react-spinners";
import UserDetails from "../UserDetails/UserDetails";
import { UsersResponse, UserType } from "../../../interfaces/userTypes";
import EditUser from "../EditUser/EditUser";
import { toast } from "react-toastify";

const HeaderTable: string[] = [
  "User number",
  "Full name",
  "Email",
  "Phone number",
  "The role",
  "Procedures",
];

const UsersTable = () => {
  const [dataUsers, setDataUsers] = useState<UsersResponse>(
    {} as UsersResponse
  );
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserType>({} as UserType);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleGetAllUsers = (): Promise<UsersResponse> => {
    return axios
      .get(`${baseUrl}${users}?pageNumber=${pageNumber}`)
      .then((res) => res.data);
  };
  const handleSearchUsers = async (): Promise<void> => {
    setIsLoadingSearch(true);
    try {
      const res = await axios.get(
        `${baseUrl}${searchByEmail}?emailPrefix=${searchQuery}&?pageNumber=${pageNumber}`
      );
      setDataUsers(res.data);
    } catch (error) {
      setDataUsers({} as UsersResponse);
      console.log(error);
    } finally {
      setIsLoadingSearch(false);
    }
  };
  const handleGetUserDetails = async (userId: number): Promise<void> => {
    setIsLoadingSearch(true);
    try {
      const res = await axios.get(`${baseUrl}${users}/${userId}`);
      setUserDetails(res.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoadingSearch(false);
    }
  };
  const viewDetails = (userId: number) => {
    handleGetUserDetails(userId);
    setIsOpenDetails(true);
  };
  const showDetailsToEdit = (userId: number) => {
    setIsOpenEdit(true);
    handleGetUserDetails(userId);
  };
  const handleDeleteUser = async (userId: number): Promise<void> => {
    try {
      await toast.promise(
        axios.delete(`${baseUrl}${users}/${userId}?id=${userId}`),
        {
          pending: "Deleting account...",
          success: "Account has been deleted successfully",
          error: "Failed to delete account",
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
      await refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data,
    isLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["GetAllUsers", pageNumber],
    queryFn: handleGetAllUsers,
  });

  const totalPages = dataUsers?.totalPages ?? 1;
  const totalCount = dataUsers?.totalCount ?? 0;
  const pageSize = dataUsers?.pageSize ?? 10;

  useEffect(() => {
    if (data?.data?.length) {
      setDataUsers(data);
    }
  }, [data]);
  useEffect(() => {
    if (searchQuery.length === 0) {
      refetchUsers();
      if (data?.data?.length) setDataUsers(data);
    }
  }, [searchQuery]);

  return (
    <div className="py-4 flex flex-col gap-4">
      <UserDetails
        isOpenDetails={isOpenDetails}
        setIsOpenDetails={setIsOpenDetails}
        userDetails={userDetails}
      />
      <EditUser
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        userDetails={userDetails}
      />
      <div className="w-full flex flex-col gap-4">
        {/* Header + Search */}
        <div className="flex justify-between items-center flex-wrap gap-3 px-3">
          <h3 className="font-medium text-[18px] text-[#202430]">Users</h3>
          <div className="w-full sm:w-auto max-w-sm min-w-[300px] relative">
            <input
              className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for invoice..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
            <button
              className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
              type="button"
              onClick={handleSearchUsers}
            >
              {isLoadingSearch ? (
                <ClipLoader size={20} color="#4A90E2" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* TABLE for large screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-md bg-white ">
          {isLoading ? (
            <LoaderDashboard />
          ) : dataUsers?.data?.length > 0 ? (
            <table className="w-full  table-auto min-w-max text-center">
              <thead>
                <tr>
                  {HeaderTable.map((title: string) => (
                    <th
                      key={title}
                      className="p-4 border border-slate-200 bg-slate-50"
                    >
                      <p className="text-sm leading-none text-slate-500 font-bold">
                        {title}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataUsers?.data?.map((user: UserType, index: number) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 py-5 border-x border-slate-200">
                      <p className="block font-semibold text-sm text-slate-800">
                        {index > 8 ? index + 1 : "0" + Number(index + 1)}
                      </p>
                    </td>
                    <td className="p-4 py-5 border-x border-slate-200">
                      <p className="text-sm text-slate-500">{user.fullName}</p>
                    </td>
                    <td className="p-4 py-5 border-x border-slate-200">
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </td>
                    <td className="p-4 py-5 border-x border-slate-200">
                      <p className="text-sm text-slate-500">
                        {user.phoneNumber}
                      </p>
                    </td>
                    <td className="p-4 py-5 border-x border-slate-200">
                      <p
                        className={`text-white font-semibold capitalize px-1 py-1 rounded ${
                          user.role.toLowerCase() === "admin"
                            ? " bg-green-600 "
                            : "bg-red-400"
                        }`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td className="p-4 py-5 border-x border-slate-200">
                      <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <button
                          onClick={() => {
                            showDetailsToEdit(user.id);
                          }}
                          title="Edit"
                          className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                          style={{ backgroundColor: "#F1C40F" }}
                        >
                          <i className="fas fa-pen"></i> Edit
                        </button>
                        <button
                          onClick={() => {
                            viewDetails(user.id);
                          }}
                          title="View"
                          className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                          style={{ backgroundColor: "#4A90E2" }}
                        >
                          {isLoading ? (
                            <ClipLoader size={20} color="#4A90E2" />
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                          View
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteUser(user.id);
                          }}
                          title="Delete"
                          className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                          style={{ backgroundColor: "#F12525" }}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="py-5 text-center text-[25px] font-bold text-red-600 ">
              No Users Found 🥱
            </h2>
          )}
        </div>

        {/* CARDs for small screens */}
        {dataUsers?.data?.length > 0 ? (
          <div className="block md:hidden px-2">
            {dataUsers?.data?.map((user: UserType, index: number) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-4 mb-4 space-y-2 border border-slate-200"
              >
                <p>
                  <span className="font-bold text-slate-600">User number:</span>{" "}
                  {index + 1}
                </p>
                <p>
                  <span className="font-bold text-slate-600">Full name:</span>{" "}
                  {user.fullName}
                </p>
                <p>
                  <span className="font-bold text-slate-600">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-bold text-slate-600">Phone:</span>{" "}
                  {user.phoneNumber}
                </p>
                <p>
                  <span className="font-bold text-slate-600">Role:</span>{" "}
                  <span
                    className={`text-white font-semibold capitalize px-1 py-1 rounded ${
                      user.role.toLowerCase() === "admin"
                        ? " bg-green-600 "
                        : "bg-red-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
                <div className="pt-2">
                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <button
                      onClick={() => {
                        showDetailsToEdit(user.id);
                      }}
                      title="Edit"
                      className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                      style={{ backgroundColor: "#F1C40F" }}
                    >
                      <i className="fas fa-pen"></i> Edit
                    </button>
                    <button
                      onClick={() => {
                        viewDetails(user.id);
                      }}
                      title="View"
                      className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                      style={{ backgroundColor: "#4A90E2" }}
                    >
                      {isLoading ? (
                        <ClipLoader size={20} color="#FFFFFF" />
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                      View
                    </button>
                    <button
                      title="Delete"
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                      className="text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 ease-in-out hover:opacity-90"
                      style={{ backgroundColor: "#F12525" }}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="py-5 block md:hidden text-center text-[25px] font-bold text-red-600 ">
            No Users Found 🥱
          </h2>
        )}

        <div className="flex justify-between items-center px-4 py-3">
          {totalCount > pageSize ? (
            <>
              <div className="text-sm text-slate-500">
                Showing{" "}
                <b>
                  {(pageNumber - 1) * pageSize + 1}-
                  {Math.min(pageNumber * pageSize, totalCount)}
                </b>{" "}
                of {totalCount}
              </div>
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={Math.max(1, Math.ceil(totalPages || 0))}
              />
            </>
          ) : (
            <div className="text-sm text-slate-500">
              All users: {totalCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
