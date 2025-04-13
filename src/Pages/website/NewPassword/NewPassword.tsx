import img1 from "../../../assets/images/BLACK 1.jpg";
import img2 from "../../../assets/images/newpassword.jpg";
import NewPasswordForm from "../../../Components/website/NewPasswordForm/NewPasswordForm";

const NewPassword = () => {
  return (
    <div className="bg-[#634E3A] flex min-h-[calc(100vh-102px)] py-6 w-full justify-center items-center">
      <div className="flex bg-[#F0F2F5] gap-6 sm:gap-10 py-6 sm:py-10 px-6 sm:px-12 justify-between items-stretch lg:h-[80vh] min-h-[500px] rounded-lg overflow-hidden w-[95%] lg:w-4/5">
        {/* الفورم */}
        <div className="w-full lg:w-1/2 h-full flex flex-col flex-1">
          <div className="my-4 flex items-center justify-center">
            <img
              src={img1}
              alt="logo page"
              className="w-[250px] sm:w-[290px] h-auto"
            />
          </div>
          <div className="w-full flex-1 flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Set a new password
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#7C8493] mt-2">
              Enter your new password to complete the recovery of your account
              at Hotel Calm.
            </p>
            <NewPasswordForm />
          </div>
        </div>

        {/* الصورة */}
        <div className="hidden lg:flex lg:w-1/2 h-full flex-1">
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

export default NewPassword;
