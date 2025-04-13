import { Link } from "react-router-dom";
import img1 from "../../../assets/images/BLACK 1.jpg";
import img2 from "../../../assets/images/verify.png";

import FormVerify from "../../../Components/website/FormVerify/FormVerify";

const VerifyCode = () => {
  return (
    <div className="bg-[#634E3A] flex h-screen w-full mt-12 justify-center items-center">
      <div className="flex bg-[#F0F2F5] gap-[40px] py-[40px] px-[80px] justify-between items-stretch lg:h-4/5 rounded-lg overflow-hidden w-[95%] lg:w-4/5">
        <div className=" w-full  lg:w-1/2 h-full flex flex-col   relative">
          <Link to={"/login"} className="text-[#1B2B3A] ">
            <i className="fa-solid fa-chevron-left"></i>
            <span className="ml-1"> Back to login </span>
          </Link>
          <div className="my-4 flex items-center justify-center">
            <img src={img1} alt="logo page " className="w-[290px] h-[193px]" />
          </div>
          <div className=" w-full ">
            <div className="">
              <h1 className="text-[40px] font-bold">Verify the code</h1>
              <p className="text-[16px] text-[#7C8493]">
                We have sent you a verification code to your email. Please enter
                the code below to confirm your identity and regain access to
                your account.
              </p>
            </div>
            <FormVerify />
          </div>
        </div>
        <div className="h-full hidden lg:block lg:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={img2}
            alt="register image page"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
