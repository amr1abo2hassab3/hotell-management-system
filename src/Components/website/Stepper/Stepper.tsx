interface stepsType {
  id: number;
  label: string;
}

type StepperProps = {
  currentStep: number;
  steps: stepsType[];
};

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className=" md:w-[70%] mx-auto p-6 rounded-lg shadow-md mt-10 ">
      <div className="relative flex justify-between items-center mb-8">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0 rounded"></div>
        <div
          className="absolute top-5 left-0 h-1 bg-[#C4A484] z-0 transition-all duration-300 rounded"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 ${
                currentStep >= step.id
                  ? "bg-[#986D3C] text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-full flex items-center justify-center font-bold mb-2`}
            >
              {step.id}
            </div>
            <span
              className={`text-sm font-bold ${
                currentStep >= step.id ? "text-[#986D3C] " : "text-gray-600"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
