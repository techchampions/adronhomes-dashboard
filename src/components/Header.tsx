import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { searchProperties } from "../data/api";
import { useGetNotifications } from "../data/hooks";
import { useSearchStore } from "../zustand/SearchStore";
import { useModalStore } from "../zustand/useModalStore";
import { useUserStore } from "../zustand/UserStore";
import AddFundAmount from "./DashboardHomeComponents/AddFundAmount";
import InputField from "./InputField";
import { UserButton } from "./UserButton";

const Header = ({ pageTitle }: { pageTitle: string }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { openModal } = useModalStore();
  const { setSearchResults, setLoading } = useSearchStore();
  const { data: notificationData } = useGetNotifications(1);
  const unReadCount = notificationData?.unread || 0;
  const queryClient = useQueryClient();
  const currentPath = window.location.pathname;
  const isPropertyDetail = /^\/my-property\/\d+$/.test(currentPath);
  const location = useLocation();
  const match = useMatch("/my-property/:id");

  const goToProfile = () => {
    navigate("/dashboard/settings");
  };
  const goBack = () => {
    if (match) {
      navigate("/dashboard/my-properties");
    } else {
      navigate(-1);
    }
  };
  const handleFundWallet = () => {
    return openModal(<AddFundAmount goBack={goBack} />);
  };
  const handleBuyProperty = () => {
    navigate("/dashboard/new-property");
  };
  return (
    <div className="hidden lg:flex justify-between items-center bg-white rounded-3xl p-8 mb-5">
      <div
        className="flex justify-center items-center border border-gray-200 hover:bg-gray-200 cursor-pointer rounded-full p-3"
        onClick={goBack}
      >
        <FaArrowLeft className="cursor-pointer" />
      </div>
      <div className="text-2xl">{pageTitle}</div>
      <div className="">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            setLoading(true); // ✅ Start loading

            try {
              const data = await queryClient.fetchQuery({
                queryKey: ["search-properties-results", values.search],
                queryFn: () => searchProperties({ search: values.search }),
              });

              setSearchResults(data);
              navigate("/dashboard/search-properties");
            } catch (error) {
              console.error("Search error:", error);
              setLoading(false); // ✅ Stop loading on error
            }
          }}
        >
          <Form className="flex items-center gap-2">
            <InputField
              name="search"
              type="text"
              placeholder="Search..."
              className="!w-[300px] text-adron-black"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </Form>
        </Formik>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="w-7 h-7 relative cursor-pointer"
          onClick={() => navigate("/dashboard/notifications")}
        >
          <img
            src="/images/notifications-rounded.svg"
            alt=""
            className="h-full w-full"
            onClick={() => navigate("/dashboard/notifications")}
          />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unReadCount}
          </span>
        </div>
        {/* <div className="">
          <Button
            label="Fund Wallet"
            className="px-6 text-sm"
            onClick={handleFundWallet}
          />
        </div> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
