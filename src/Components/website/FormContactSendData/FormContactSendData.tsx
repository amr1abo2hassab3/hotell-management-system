import { useContext, useState } from "react";
import emailjs from "emailjs-com";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const FormContactSendData = () => {
  const { userData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: userData?.email,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_mcl901m",
        "template_5302o14",
        {
          ...formData,
          time: new Date().toLocaleString(),
        },
        "CUS6cB0k1d-gHbFu1"
      )
      .then(() => {
        alert("تم إرسال الرسالة بنجاح ✅");
        setFormData({ user_name: "", user_email: "", message: "" });
      })
      .catch(() => {
        alert("حدث خطأ أثناء الإرسال ❌");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div>
        <label htmlFor="user_name" className="block font-bold mb-2">
          Name and surname
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-bold mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message"
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#986D3C] text-white py-3 rounded-md hover:bg-[#C4A484] transition"
      >
        Send
      </button>
    </form>
  );
};

export default FormContactSendData;
