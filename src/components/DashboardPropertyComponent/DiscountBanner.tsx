// import { X } from "lucide-react";
// import React from "react";

// interface Props {
//   discount_name: string;
//   discount_percent: number;
//   discount_unit: number;
//   isOpen: boolean;
//   close: () => void;
// }
// const DiscountBanner: React.FC<Props> = ({
//   discount_name,
//   discount_percent,
//   discount_unit,
//   isOpen,
//   close,
// }) => {
//   if (!isOpen) {
//     return null;
//   }
//   return (
//     <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
//       <div className=" w-lg h-[200px] relative rounded-md shadow-2xl bg-white flex items-center justify-center">
//         <img
//           src="/images/Lemon-Friday-hor.png"
//           alt="banner"
//           className="w-full h-full"
//         />
//         <button
//           className="absolute -top-3 -right-3 bg-white h-8 w-8 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:bg-gray-100 transition-colors z-10 border border-gray-200"
//           onClick={close}
//         >
//           <X size={20} />
//         </button>
//         <div className="absolute inset-0 bg-black/50 flex items-center text-white">
//           <div className="p-4">
//             <h3 className="text-3xl !font-adron-ultra">
//               {discount_name} Promo!
//             </h3>
//             <p>
//               Get{" "}
//               <span className="bg-red-500 rounded-full px-4">
//                 {discount_percent}%
//               </span>{" "}
//               off when you purchase <strong>{discount_unit}</strong> units of
//               this property
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscountBanner;

import { X } from "lucide-react";
import React from "react";

interface Props {
  discount_name: string;
  discount_percent: number;
  discount_unit: number;
  isOpen?: boolean;
  close: () => void;
}

const DiscountBanner: React.FC<Props> = ({
  discount_name,
  discount_percent,
  discount_unit,
  isOpen = false,
  close,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="overflow-hidden w-lg h-[200px] relative rounded-md shadow-2xl bg-white flex items-center justify-center">
        <img
          src="/images/Lemon-Friday-hor.png"
          alt="banner"
          className="w-full h-full object-cover"
        />

        {/* Close button positioned at top right corner */}
        <button
          className="absolute top-2 right-2 bg-white/50 h-8 w-8 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:bg-white transition-colors z-10"
          onClick={close}
          aria-label="Close discount banner"
        >
          <X size={20} />
        </button>

        <div className="absolute inset-0 bg-black/50 flex items-center text-white">
          <div className="p-4">
            <h3 className="text-3xl !font-adron-ultra">
              {discount_name} Promo !
            </h3>
            <p>
              Get{" "}
              <span className="bg-red-500 rounded-full px-4">
                {discount_percent}%
              </span>{" "}
              off when you purchase <strong>{discount_unit}</strong> units of
              this property
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
