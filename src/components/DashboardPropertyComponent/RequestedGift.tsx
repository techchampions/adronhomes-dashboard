import { AlertCircle, CheckCircle2, Ellipsis, Gift } from "lucide-react";

interface Prop {
  gift_request: GiftRequest;
}
const RequestedGift: React.FC<Prop> = ({ gift_request }) => {
  return (
    <div className="bg-white mt-2 rounded-2xl px-4 py-8 w-sm">
      <div className="text-2xl font-adron-bold">Your Requested Items</div>
      <div
        className={`${
          gift_request.status === "approved" && "text-green-600 bg-green-500/50"
        } ${
          gift_request.status === "pending" &&
          "text-yellow-600 bg-yellow-500/20"
        } ${
          gift_request.status === "rejected" && "text-red-600"
        } flex items-center gap-2 p-2 rounded-lg`}
      >
        {gift_request.status === "approved" && (
          <div className="p-1 rounded-full border">
            <CheckCircle2 size={14} />
          </div>
        )}
        {gift_request.status === "pending" && (
          <div className="p-1 rounded-full border">
            <Ellipsis size={14} />
          </div>
        )}
        {gift_request.status === "rejected" && (
          <div className="p-1 rounded-full border">
            <AlertCircle size={14} />
          </div>
        )}
        <div className="">Your request is {gift_request.status}</div>
      </div>
      <div className="grid gap-2 mt-8 divide-y divide-gray-300">
        <div className="grid grid-cols-5 gap-2 px-4 font-adron-bold">
          <div className=""></div>
          <div className="">Qty</div>
          <div className="col-span-3">Item</div>
        </div>
        <div className="">
          {gift_request.items.map((item, i) => (
            <div
              className="grid grid-cols-5 gap-2 hover:bg-gray-100 px-4 py-1 rounded-lg"
              key={i}
            >
              <Gift />
              <div className="">{item.qty}</div>
              <div className="col-span-3">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestedGift;
