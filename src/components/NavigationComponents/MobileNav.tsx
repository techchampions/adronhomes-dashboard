import { useState } from "react";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import {
  RiHomeHeartFill,
  RiLogoutBoxRFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import { Menu, X } from "lucide-react"; // or use any icon you prefer

import NavItem from "./NavItem";
import NavbarAddorder from "./NavbarAddorder";
import Auth from "../../utils/Auth";
import { useUserStore } from "../../zustand/UserStore";
import { Link, useNavigate } from "react-router-dom";
import CopyButton from "../CopyButton";
import { useGetNotifications } from "../../data/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchStore } from "../../zustand/SearchStore";
import { searchProperties } from "../../data/api";

const MobileNav = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setSearchResults, setLoading } = useSearchStore();

  const { data: notificationData } = useGetNotifications(1);
  const unReadCount = notificationData?.unread || 0;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const goTpProfile = () => {
    navigate("/dashboard/my-profile");
  };

  return (
    <>
      <nav className="flex justify-between fixed top-0 left-0 right-0 z-[60] bg-adron-body p-4 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
          <Link to="/">
            <img src="/logo.png" alt="" className="h-[30px] w-[100px]" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="border border-gray-300 rounded-xl px-4 py-1 gap-1 flex flex-col">
            <div className="flex justify-between w-full gap-4">
              <p className="text-[10px] text-gray-400">Customer ID</p>
              <CopyButton text={user?.unique_customer_id} />
            </div>
            <p className="text-xs">
              {user?.unique_customer_id || "No Customer ID"}
            </p>
          </div> */}

          {/* <Button label="View Property" className="text-xs px-4" /> */}
          {user?.profile_picture ? (
            <img
              src={user?.profile_picture || ""}
              alt=""
              className="h-7 w-7 rounded-full"
              onClick={goTpProfile}
            />
          ) : (
            <FaUserCircle className="h-7 w-7" onClick={goTpProfile} />
          )}
        </div>
      </nav>
      {/* Hamburger Button */}
      <div
        className={`fixed left-0 top-0 z-[60] transition-transform duration-300 h-screen lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex`}
      >
        {/* Transparent dark overlay */}
        <div
          className="flex-1 bg-black/30"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Side drawer menu */}
        <div className="w-64 bg-white h-screen p-6 shadow-lg ">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Link to="/">
                <img src="/logo.png" alt="logo" className=" w-[60%]" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="border border-gray-300 rounded-xl px-4 py-1 gap-1 flex flex-col">
              <div className="flex justify-between w-full gap-4">
                <p className="text-[10px] text-gray-400">Customer ID</p>
                <CopyButton text={user?.unique_customer_id} />
              </div>
              <p className="text-xs">
                {user?.unique_customer_id || "No Customer ID"}
              </p>
            </div>

            <input
              placeholder="Search..."
              className="px-6 bg-adron-body rounded-full py-2 text-xs"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={async () => {
                try {
                  const data = await queryClient.fetchQuery({
                    queryKey: ["search-properties-results", query],
                    queryFn: () => searchProperties({ search: query }),
                  });

                  setSearchResults(data);
                  navigate("/dashboard/search-properties");
                } catch (error) {
                  console.error("Search error:", error);
                  setLoading(false); // ✅ Stop loading on error
                }
              }}
            />
          </div>

          <div className="w-full py-1.5 h-[88%] overflow-y-scroll scrollbar-hide bg-white rounded-2xl">
            <nav className="space-y-2 p-2">
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Dashboard"
                icon={<MdDashboardCustomize className="w-4 h-4" />}
                path="/dashboard/"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="My Wallet"
                icon={<RiWallet3Fill className=" w-4 h-4" />}
                path="/dashboard/wallet"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Payments"
                icon={<FaArrowRightArrowLeft className=" w-4 h-4" />}
                path="/dashboard/payments"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Notifications"
                icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
                path="/dashboard/notifications"
                badge={unReadCount || 0}
              />
              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                LISTINGS
              </h4>
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="My Properties"
                icon={<MdAddHome className=" w-4 h-4" />}
                path="/dashboard/my-properties"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="New Properties"
                icon={<MdAddHome className=" w-4 h-4" />}
                path="/dashboard/new-properties"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Saved Properties"
                icon={<RiHomeHeartFill className=" w-4 h-4" />}
                path="/dashboard/saved-properties"
              />
              {/* Profile Nav */}
              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                PROFILE
              </h4>
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="My Profile"
                icon={<FaUserAlt className=" w-4 h-4" />}
                path="/dashboard/my-profile"
              />
              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Account Settings"
                icon={<IoSettingsSharp className=" w-4 h-4" />}
                path="/dashboard/settings"
              />

              <NavItem
                onSlideBack={setIsMobileMenuOpen}
                label="Support"
                icon={<MdOutlineHelp className=" w-4 h-4" />}
                path="/dashboard/support"
              />
            </nav>
            {/* <div className="px-4 py-20">
              <NavbarAddorder />
            </div> */}
            <nav className="space-y-2 p-2">
              <button
                onClick={() => {
                  Auth.logout();
                }}
                className="flex items-center w-full px-7 py-[7px] text-[12px] text-red-500 rounded-full bg-[#FFE6E6] hover:bg-red-200"
              >
                <RiLogoutBoxRFill className="mr-2  w-4 h-4" />
                Logout
              </button>
              <a
                href="https://adronhomes.com/"
                className="text-adron-green text-[12px] w-full block font-bold px-7 py-[7px] text-center mx-auto"
              >
                Go to Website
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
