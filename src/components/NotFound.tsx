import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
interface Props {
  text?: string;
}
const NotFound: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] h-[40vh] mx-auto bg-red relative">
      <img src="/not-found.svg" alt="error" className="h-full w-full" />
      <div className="flex gap-1 items-center">
        <FaExclamationCircle size={14} className="text-gray-500" />
        <span className="text-gray-500">
          No {text ? text : "transactions"} found.
        </span>
      </div>
    </div>
  );
};

export default NotFound;
