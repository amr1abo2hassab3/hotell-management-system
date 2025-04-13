import { Link } from "react-router-dom";

type NavLink = {
  label: string;
  to: string;
  color: string;
};
type SocialLinks = {
  icon: string;
  to: string;
};
const links1: NavLink[] = [
  { label: "Services", to: "/services", color: "#C49C74" },
  { label: "Email Marketing", to: "/", color: "#FFFFFF" },
  { label: "Campaigns", to: "/", color: "#FFFFFF" },
  { label: "Branding", to: "/", color: "#FFFFFF" },
  { label: "Offline", to: "/", color: "#FFFFFF" },
];
const links2: NavLink[] = [
  { label: "About", to: "/about", color: "#C49C74" },
  { label: "Our Story", to: "/", color: "#FFFFFF" },
  { label: "Benefits", to: "/", color: "#FFFFFF" },
  { label: "Team", to: "/", color: "#FFFFFF" },
  { label: "Careers", to: "/", color: "#FFFFFF" },
];
const links3: NavLink[] = [
  { label: "Help", to: "/contactus", color: "#C49C74" },
  { label: "FAQs", to: "/", color: "#FFFFFF" },
  { label: "Contact Us", to: "/contactus", color: "#FFFFFF" },
];

const socialLinks: SocialLinks[] = [
  {
    icon: "fa-brands fa-facebook-f",
    to: "/",
  },
  {
    icon: "fa-brands fa-twitter",
    to: "/",
  },
  {
    icon: "fa-brands fa-instagram",
    to: "/",
  },
];

const FooterBottom = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center md:justify-end gap-5 py-5 border-b-[1px] border-[#979797]">
        <h4 className="text-[22px] text-white">Ready to get started?</h4>
        <button className="text-[20px]  font-medium bg-[#C49C74] w-[172px] h-[76px] rounded-[8px]">
          Get started
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 gap-16">
        <div className="flex flex-col justify-between">
          <h5 className="text-[22px] text-center md:text-left text-white">
            Subscribe to our newsletter
          </h5>
          <form className="mt-5">
            <div className="h-[100px] relative border-b border-[#979797] text-white">
              <input
                type="email"
                className="h-full w-full outline-none px-4 text-[15px] bg-transparent"
                placeholder="Email address"
              />
              <button className="w-[65px] h-full absolute bg-[#C49C74] right-0">
                <i className="fa-solid font-bold fa-chevron-right "></i>
              </button>
            </div>
          </form>
        </div>
        <ul className="flex flex-col items-center md:items-start gap-7">
          {links1.map((link: NavLink, index: number) => (
            <li key={index}>
              <Link
                className={`text-[17px] ${
                  link.color === "#C49C74" ? "text-[#C49C74]" : "text-white"
                } hover:text-[#C49C74] transition-colors`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center md:items-start gap-7 ">
          {links2.map((link: NavLink, index: number) => (
            <li key={index}>
              <Link
                className={`text-[17px] ${
                  link.color === "#C49C74" ? "text-[#C49C74]" : "text-white"
                } hover:text-[#C49C74] transition-colors`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center md:items-start gap-7">
          {links3.map((link: NavLink, index: number) => (
            <li key={index}>
              <Link
                className={`text-[17px] ${
                  link.color === "#C49C74" ? "text-[#C49C74]" : "text-white"
                } hover:text-[#C49C74] transition-colors`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-9 text-white">
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <ul className="flex items-center gap-11">
          {socialLinks.map((item: SocialLinks, index: number) => (
            <li key={index}>
              <Link to={item.to} className="text-[30px] text-white">
                <i className={item.icon}></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterBottom;
