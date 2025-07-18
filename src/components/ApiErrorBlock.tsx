import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ApiErrorBlock: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] h-[40vh] mx-auto bg-red relative">
      <img src="/500.svg" alt="error" className="h-full w-full" />
      <div className="flex gap-1 items-center">
        <FaExclamationCircle size={14} className="text-red-400" />
        <h4 className="text-red-400">Internal Server Error</h4>
      </div>
    </div>
  );
};

export default ApiErrorBlock;
