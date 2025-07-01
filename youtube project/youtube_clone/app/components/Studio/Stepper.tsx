import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full py-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                index < currentStep
                  ? 'bg-black text-white'
                  : index === currentStep
                  ? 'border-2 border-black text-black'
                  : 'border-2 border-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm ${
                index <= currentStep ? 'text-gray-700' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < currentStep ? 'bg-black' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;