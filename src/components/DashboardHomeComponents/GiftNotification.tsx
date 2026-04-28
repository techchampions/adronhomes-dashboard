import React from "react";
import LinkButton from "../LinkButton";
interface Prop {
  item: UserProperty;
}
const GiftNotification: React.FC<Prop> = ({ item }) => {
  return (
    <div className=" my-auto px-12 py-5 text-white space-y-2">
      <div className="font-adron-bold text-lg">Gift avialable</div>
      <div className="text-sm">
        Gifts available for {item.property.name} {item.property.size} SqM
      </div>
      <LinkButton
        link={`/dashboard/my-property/${item.id}`}
        label="Claim now!"
        className="w-fit! px-7 text-sm"
      />
      {/* <LinkButton
        href=""
        // href={`/dashboard/my-property/${item?.id || 0}`}
        label="Claim now!"
        className="w-fit! px-7 text-sm"
      /> */}
    </div>
  );
};

export default GiftNotification;
