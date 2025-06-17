import FormContactSendData from "../FormContactSendData/FormContactSendData";

const ContactForm = () => {
  return (
    <div className="container mx-auto md:px-[80px] px-[20px] gap-6 py-[40px] bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between transition-all duration-300">
      {/* المعلومات */}
      <div className="text-center w-full md:w-1/2 flex flex-col gap-10">
        <div>
          <h2 className="font-bold text-[#0F1A24] text-[40px] mb-4 md:text-[48px] transition-all duration-300">
            Contact us!
          </h2>
          <p className="text-[#51586F] text-[16px] md:text-[18px] font-medium">
            Fill out the form and our team will respond to you within <br /> 24
            hours.
          </p>
        </div>

        <div className="space-y-5 flex flex-col items-center md:items-center">
          <div className="flex items-start gap-3">
            <i className="fas fa-envelope text-[#F1C40F] mt-1 text-[20px]"></i>
            <span className="text-[16px] md:text-[18px] text-[#51586F]">
              amrabohassab123@gmail.com
            </span>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas fa-phone text-[#F1C40F] mt-1 text-[20px]"></i>
            <span className="text-[16px] md:text-[18px] text-[#51586F]">
              01065061673
            </span>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas fa-map-marker-alt text-[#F1C40F] mt-1 text-[20px]"></i>
            <address className="text-[16px] md:text-[18px] text-[#51586F] not-italic">
              123 Downtown St.
              <br />
              City Name, Country
            </address>
          </div>
        </div>
      </div>

      {/* الفورم */}
      <div className="p-[30px] w-full md:w-1/2 bg-[#ABADB7] shadow-lg rounded-lg">
        <FormContactSendData />
      </div>
    </div>
  );
};

export default ContactForm;
