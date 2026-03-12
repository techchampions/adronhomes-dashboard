declare module "*.css";
// src/global.d.ts

// export {};

// declare global {
//   interface Window {
//     Tawk_API?: {
//       showWidget: () => void;
//       hideWidget: () => void;
//       maximize: () => void;
//       minimize: () => void;
//       toggle: () => void;
//       popup: () => void;
//       onLoad: (callback: () => void) => void;
//       // Add other methods you plan to use
//     };
//     Tawk_LoadStart?: Date;
//   }
// }

interface UserAccount {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
}
