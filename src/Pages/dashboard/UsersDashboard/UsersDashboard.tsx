import { useState } from "react";
import AddNewUserForm from "../../../Components/dashboard/AddNewUserForm/AddNewUserForm";
import UsersTable from "../../../Components/dashboard/UsersTable/UsersTable";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            users
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            All users registered in the system can be managed by the user, such
            as adding a new user, updating user data, or deleting an account.
          </p>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-[264px] h-[48px] bg-[#2C3E50] rounded-[16px] text-[18px] font-medium text-white"
        >
          Add a new user{" "}
        </button>

        {isOpen && <AddNewUserForm setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
      <div className=" shadow-md rounded-lg">
        <UsersTable />
      </div>
    </div>
  );
};

export default UserDashboard;
