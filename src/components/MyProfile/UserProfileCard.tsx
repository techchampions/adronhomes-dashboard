import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/utils";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import EditProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import { Info } from "lucide-react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  location: string;
  imageUrl?: string;
}

const UserProfileCard: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  joinedDate,
  location,
  imageUrl,
}) => {
  const { openModal } = useModalStore();
  return (
    <div className="bg-white py-6 px-4 md:px-12 rounded-3xl flex flex-col md:flex-row justify-between items-center md:items-end">
      <div className="flex flex-col sm:flex-row items-start gap-6 py-5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={firstName}
            className="w-[140px] h-[140px] rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-[140px] h-[140px] rounded-full object-cover" />
        )}
        <div className="space-y-1.5">
          <h4 className="text-2xl font-bold">
            {firstName} {lastName}
          </h4>
          <p className="text-gray-600 text-sm">{email}</p>
          <p className="text-gray-500 text-xs">
            Joined {formatDate(joinedDate)}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            {location ? (
              <>
                <FaMapMarkerAlt className="mr-1 h-3 w-3" />
                {location}
              </>
            ) : (
              <>
                <Info className="h-3 w-3 mr-1" />
                <span>No address... update your profile</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          label="Edit Profile"
          onClick={() => openModal(<EditProfile />)}
          className="text-xs !w-fit px-5 !bg-black"
        />
        <Button
          label="Change Password"
          onClick={() => openModal(<ChangePassword />)}
          className="text-xs !w-fit px-5 !bg-black"
        />
      </div>
      {/* <Link
        to="/dashboard/settings"
        className="text-sm font-semibold text-white bg-black hover:bg-black/10 hover:text-black transition duration-500 px-5 py-2 rounded-full"
      >
        Edit Profile
      </Link> */}
    </div>
  );
};

export default UserProfileCard;
