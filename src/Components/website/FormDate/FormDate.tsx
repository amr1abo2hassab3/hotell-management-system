import { useState } from "react";

const FormDate: React.FC = () => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState<number | "">("");
  const [children, setChildren] = useState<number | "">("");

  const [focusCheckIn, setFocusCheckIn] = useState(false);
  const [focusCheckOut, setFocusCheckOut] = useState(false);
  const [focusAdults, setFocusAdults] = useState(false);
  const [focusChildren, setFocusChildren] = useState(false);

  return (
    <div className="my-7 flex items-center justify-center w-full bg-[rgba(0,0,51,0.22)] px-4 py-6 rounded-lg">
      <form className="w-full max-w-5xl flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center z-10">
        {/* Check-in Field */}
        <div className="relative w-full sm:w-[182px] h-[40px]">
          {!checkIn && !focusCheckIn && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm pointer-events-none">
              Check in
            </span>
          )}
          <input
            className={`outline-none ${
              checkIn ? "text-black" : "text-white"
            } p-2 rounded-md w-full h-full cursor-pointer text-sm font-semibold bg-white`}
            type="date"
            value={checkIn}
            onFocus={() => setFocusCheckIn(true)}
            onBlur={() => setFocusCheckIn(false)}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        {/* Check-out Field */}
        <div className="relative w-full sm:w-[182px] h-[40px]">
          {!checkOut && !focusCheckOut && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm pointer-events-none">
              Check out
            </span>
          )}
          <input
            className={`outline-none ${
              checkOut ? "text-black" : "text-white"
            } p-2 rounded-md w-full h-full cursor-pointer text-sm font-semibold bg-white`}
            type="date"
            value={checkOut}
            onFocus={() => setFocusCheckOut(true)}
            onBlur={() => setFocusCheckOut(false)}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {/* Adults Field */}
        <div className="relative w-full sm:w-[112px] h-[40px]">
          {!adults && !focusAdults && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm pointer-events-none">
              Adults
            </span>
          )}
          <input
            className={`outline-none ${
              adults ? "text-black" : "text-white"
            } p-2 rounded-md w-full h-full cursor-pointer text-sm font-semibold bg-white`}
            type="number"
            min="0"
            value={adults}
            onFocus={() => setFocusAdults(true)}
            onBlur={() => setFocusAdults(false)}
            onChange={(e) => setAdults(Number(e.target.value) || "")}
          />
        </div>

        {/* Children Field */}
        <div className="relative w-full sm:w-[112px] h-[40px]">
          {!children && !focusChildren && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm pointer-events-none">
              Children
            </span>
          )}
          <input
            className={`outline-none ${
              children ? "text-black" : "text-white"
            } p-2 rounded-md w-full h-full cursor-pointer text-sm font-semibold bg-white`}
            type="number"
            min="0"
            value={children}
            onFocus={() => setFocusChildren(true)}
            onBlur={() => setFocusChildren(false)}
            onChange={(e) => setChildren(Number(e.target.value) || "")}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="capitalize w-full sm:w-[182px] h-[40px] bg-[#C4A484] rounded-lg text-sm font-semibold text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default FormDate;
