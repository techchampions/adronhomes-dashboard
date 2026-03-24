import { RefreshCcw } from "lucide-react";
import { useFetchMutipleAccounts } from "../data/hooks";
import { useModalStore } from "../zustand/useModalStore";
import { useUserStore } from "../zustand/UserStore";
import SwitchAccount from "./NavigationComponents/SwitchAccount";

export const UserButton = () => {
  const { user } = useUserStore();
  const modal = useModalStore();

  const { data, isLoading, isError } = useFetchMutipleAccounts();
  const accounts = data?.accounts || [];
  const switchAccount = () => {
    modal.openModal(<SwitchAccount users={accounts} />);
  };

  return (
    <div className="border border-gray-300 rounded-xl px-2 py-2 flex items-center justify-between gap-2">
      <div className="flex items-start gap-1 flex-1 text-sm">
        <img
          src={user?.profile_picture || ""}
          alt=""
          className="w-7 h-7 bg-adron-black rounded-full"
        />
        <div className="text-xs ">
          <div className="line-clamp-1">
            {user?.first_name} {user?.last_name}
          </div>
          <div className="text-gray-600 text-[10px]">
            {user?.unique_customer_id}
          </div>
        </div>
      </div>
      {accounts.length > 1 && (
        <div
          onClick={switchAccount}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <RefreshCcw />
        </div>
      )}
    </div>
  );
};

export const SwitchAccountButton = () => {
  const { user } = useUserStore();
  const modal = useModalStore();

  const { data, isLoading, isError } = useFetchMutipleAccounts();
  const accounts = data?.accounts || [];
  const switchAccount = () => {
    modal.openModal(<SwitchAccount users={accounts} />);
  };

  return (
    <div
      onClick={switchAccount}
      className={`${
        accounts.length < 1 && isLoading
          ? "hidden"
          : "flex items-center gap-2 py-2 px-7 text-xs cursor-pointer text-adron-gray-400 hover:bg-gray-200 rounded-xl"
      }`}
    >
      <RefreshCcw size={15} />
      <div className="">Switch Account</div>
    </div>
  );
};
