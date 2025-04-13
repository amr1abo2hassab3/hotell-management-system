import img1 from "../../../assets/images/register.jpg";
import RegisterForm from "../../../Components/website/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="bg-[#634E3A] flex min-h-[calc(100vh-102px)] py-6 w-full  justify-center items-center">
      <div className="flex justify-between items-stretch   lg:min-h-[80vh] rounded-lg overflow-hidden w-[95%] lg:w-4/5">
        {/* قسم الصورة */}
        <div className="hidden lg:flex lg:w-2/5">
          <img
            className="w-full h-full object-cover"
            src={img1}
            alt="register image page"
          />
        </div>

        {/* قسم الفورم */}
        <div className="bg-[#F0F2F5] w-full py-9 lg:w-3/5 flex flex-col justify-center items-center  min-h-full">
          <div className="lg:w-4/5 w-full text-center">
            <h1 className="text-2xl font-semibold">
              Get Started With Travel Pulse
            </h1>
            <h3 className="text-sm text-gray-500">Getting started is easy</h3>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
