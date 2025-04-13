import img1 from "../../../assets/images/loginimage.png";
import LoginForm from "../../../Components/website/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="bg-[#634E3A] flex min-h-[calc(100vh-102px)] py-6 w-full  justify-center items-center">
      <div className="flex justify-between items-stretch lg:h-[80vh] rounded-lg overflow-hidden w-[95%] lg:w-4/5">
        {/* قسم تسجيل الدخول */}
        <div className="bg-[#F0F2F5] w-full py-9 lg:w-3/5 h-full flex justify-center items-center flex-col">
          <div className="lg:w-4/5 w-full text-center">
            <h1 className="text-[36px] font-semibold">Welcome Back</h1>
            <h3 className="text-[18px] text-gray-500">
              Login into your account
            </h3>
            <LoginForm />
          </div>
        </div>

        {/* قسم الصورة */}
        <div className="hidden lg:flex lg:w-2/5 h-full">
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

export default Login;
