import { CheckCircle2, User2, UserCircle } from "lucide-react";
import React from "react";
import { useSwitchAccount } from "../../data/hooks";
import { useUserStore } from "../../zustand/UserStore";
import SmallLoader from "../SmallLoader";
interface Prop {
  users: UserAccount[];
}
const SwitchAccount: React.FC<Prop> = ({ users }) => {
  const { mutate, isPending } = useSwitchAccount();
  const { user: activeUser } = useUserStore();
  const handleClick = (customer_code: string) => {
    const payload = {
      customer_code: customer_code,
    };
    mutate(payload);
  };
  if (isPending) {
    return (
      <div className="md:w-sm min-h-50 flex gap-4 flex-col items-center justify-center text-center">
        <SmallLoader classname="w-fit! h-fit!" />
        <div className="flex items-center gap-1 animate-pulse text-gray-600">
          <UserCircle size={15} />
          <div className="">Switching Users...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="md:w-sm max-h-[75vh] overflow-y-auto scrollbar-hide">
      <div className="">
        <h2 className="text-2xl font-black">Select your account</h2>
        <div className="mt-4 border border-gray-200 rounded-xl divide-y overflow-hidden divide-gray-200">
          {users.map((user, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer ${
                activeUser?.unique_customer_id === user.customer_code &&
                "bg-adron-green text-white"
              }`}
              onClick={() => handleClick(user.customer_code)}
            >
              <div className="bg-adron-green border-2 text-white h-10 w-10 rounded-full flex items-center justify-center">
                <User2 />
              </div>
              <div className=" flex-1">
                <div className="text-xs font-adron-bold">
                  {user.first_name} {user.last_name}
                </div>
                <div className=" text-xs">
                  {user.customer_code || "No customer code assigned!"}
                </div>
              </div>
              {activeUser?.unique_customer_id === user.customer_code && (
                <div className="">
                  <CheckCircle2 />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchAccount;
