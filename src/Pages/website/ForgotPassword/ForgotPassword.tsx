import { Link } from "react-router-dom";
import img1 from "../../../assets/images/forgot-password.jpg";
import img2 from "../../../assets/images/BLACK 1.jpg";
import ForgetForm from "../../../Components/website/ForgotForm/ForgotForm";

const ForgotPassword = () => {
  return (
    <div className="bg-[#634E3A] flex min-h-[calc(100vh-102px)] py-6 w-full justify-center items-center">
      <div className="flex bg-[#F0F2F5] gap-[40px] py-[40px] px-[80px] justify-between items-stretch lg:h-[80vh] min-h-[500px] rounded-lg overflow-hidden w-[95%] lg:w-4/5">
        {/* الفورم */}
        <div className="w-full lg:w-1/2 flex flex-col flex-1 h-full">
          <Link to={"/login"} className="text-[#1B2B3A]">
            <i className="fa-solid fa-chevron-left"></i>
            <span className="ml-1"> Back to login </span>
          </Link>
          <div className="my-4 flex items-center justify-center">
            <img src={img2} alt="logo page" className="w-[290px] h-[193px]" />
          </div>
          <div className="w-full flex-1 flex flex-col">
            <h1 className="text-[40px] font-bold">Recover password</h1>
            <p className="text-[16px] text-[#7C8493]">
              Forgot your password? No problem! You can easily reset it and
              regain access to your account.
            </p>
            <ForgetForm />
          </div>
        </div>

        {/* الصورة */}
        <div className="hidden lg:flex lg:w-1/2 flex-1 h-full">
          <img
            className="w-full h-full object-cover"
            src={img1}
            alt="register image page"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
