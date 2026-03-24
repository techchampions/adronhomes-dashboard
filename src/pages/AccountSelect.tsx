import { ArrowLeft, User2, UserCircle } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallLoader from "../components/SmallLoader";
import { useSelectAccount } from "../data/hooks";
interface Prop {
  users: UserAccount[];
  values: { email: string; password: string };
}
const AccountSelect: React.FC<Prop> = ({ users, values }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSelectAccount();
  const handleClick = (customer_code: string) => {
    const payload = {
      email: values.email,
      password: values.password,
      customer_code: customer_code,
    };
    mutate(payload);
    // Auth.loginStep2(values, customer_code, navigate);
  };
  if (isPending) {
    return (
      <div className="md:w-sm min-h-50 flex gap-4 flex-col items-center justify-center text-center mx-auto">
        <SmallLoader classname="w-fit! h-fit!" />
        <div className="flex items-center gap-1 animate-pulse text-gray-600">
          <UserCircle size={15} />
          <div className="">Loging in User...</div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className="border h-8 w-8 border-gray-300 rounded-full flex justify-center items-center"
          >
            <ArrowLeft />
          </Link>
          <div className="">Go back to Login</div>
        </div>
        <h2 className="text-2xl font-black mt-4">Select your account</h2>
        <div className="mt-4 border border-gray-200 rounded-xl divide-y overflow-hidden divide-gray-200">
          {users.map((user, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(user.customer_code)}
            >
              <div className="bg-adron-green text-white h-10 w-10 rounded-full flex items-center justify-center">
                <User2 />
              </div>
              <div className="text-xs text-gray-800">
                <div className="font-adron-mid">
                  {user.first_name} {user.last_name}
                </div>
                <div className="">
                  #{user.customer_code || "No customer code assigned!"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSelect;
