const ContactForm = () => {
  return (
    <div className="mx-auto md:px-[80px] px-[20px] gap-4 py-[40px] bg-white rounded-lg shadow-md container flex flex-col md:flex-row items-center justify-between">
      <div className="text-center w-full md:w-1/2 flex flex-col gap-10">
        <div>
          {" "}
          <h2 className="font-bold text-[#0F1A24] text-[48px] mb-6">
            Contact us!
          </h2>
          {/* النص التمهيدي */}
          <p className="text-[#51586F] text-[18px] font-bold">
            Fill out the form and our team will respond to you within
            <br />
            24 hours.
          </p>
        </div>
        <div className="space-y-6 flex flex-col items-center">
          <div className="flex items-start gap-3">
            <i className="fas text-[#F1C40F]  fa-envelope  mt-1"></i>
            <span className=" text-[18px] text-[#51586F]">
              info@alhudoo.com
            </span>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas text-[#F1C40F] fa-phone  mt-1"></i>
            <span className=" text-[18px] text-[#51586F]">+123 456 7890</span>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas text-[#F1C40F] fa-map-marker-alt  mt-1"></i>
            <address className=" text-[18px] text-[#51586F] not-italic">
              123 Downtown St.
              <br />
              City Name, Country
            </address>
          </div>
        </div>
      </div>

      <div className="p-[30px] w-full md:w-1/2 bg-[#ABADB7] shadow-lg ">
        {/* نموذج الاتصال */}
        <form className="flex flex-col gap-[32px] w-full">
          <div className="w-full">
            <label
              className="block text-[#1B2B3A] font-bold text-[18px] mb-2"
              htmlFor="name"
            >
              Name and surname
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your first and last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C4A484]"
            />
          </div>

          <div>
            <label
              className="block text-[#1B2B3A] font-bold text-[18px] mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C4A484]"
            />
          </div>

          <button className="w-full bg-[#986D3C] text-white py-2  rounded-md hover:bg-[#C4A484] transition-colors duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
