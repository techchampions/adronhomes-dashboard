// components/PaymentSection.tsx
import React, { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiUsers,
} from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import PaymentList from "./PaymentList";

const PaymentSection: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const payments = context.data?.recent_payments.data || [];
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("property");

  const paymentTypes = [
    { id: "property", label: "Property Purchase", icon: FiHome },
    { id: "service", label: "Service Charges", icon: FiUsers },
    { id: "utility", label: "Utilities", icon: FiClock },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Payment of ₦${amount} via ${paymentMethod} for "${description}" initiated`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50";
      case "Pending":
        return "text-yellow-600 bg-yellow-50";
      case "Processing":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Pending":
        return <FiClock className="w-4 h-4" />;
      case "Processing":
        return <FiAlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800">Payments</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage all your property payments in one place
        </p>
      </div>

      {/* Payment Type Cards */}
      {/* <div className="grid grid-cols-3 gap-3">
        {paymentTypes.map((type) => {
          const Icon = type.icon;
          const isActive = paymentType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setPaymentType(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                isActive
                  ? "border-[#79B833] bg-gradient-to-r from-[#79B833]/10 to-[#8FD14F]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <Icon
                className={`w-6 h-6 mx-auto ${
                  isActive ? "text-[#79B833]" : "text-gray-500"
                }`}
              />
              <p
                className={`text-sm font-medium mt-2 ${
                  isActive ? "text-[#79B833]" : "text-gray-700"
                }`}
              >
                {type.label}
              </p>
            </button>
          );
        })}
      </div> */}

      <div className="grid gap-6">
        {/* Payment Form */}
        {/* <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Make Payment</h4>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
                    paymentMethod === "card"
                      ? "border-[#79B833] bg-[#79B833]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FiCreditCard
                    className={`w-5 h-5 ${
                      paymentMethod === "card"
                        ? "text-[#79B833]"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs mt-1 font-medium">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
                    paymentMethod === "bank"
                      ? "border-[#79B833] bg-[#79B833]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AiFillBank
                    className={`w-5 h-5 ${
                      paymentMethod === "bank"
                        ? "text-[#79B833]"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs mt-1 font-medium">Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
                    paymentMethod === "wallet"
                      ? "border-[#79B833] bg-[#79B833]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AiFillWallet
                    className={`w-5 h-5 ${
                      paymentMethod === "wallet"
                        ? "text-[#79B833]"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs mt-1 font-medium">Wallet</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#79B833] focus:border-transparent transition-all"
                placeholder="Enter amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#79B833] focus:border-transparent transition-all"
                placeholder="e.g., Property deposit, Utility bill, etc."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-xl hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
            >
              <span>Proceed to Payment</span>
              <FiArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div> */}

        {/* Payment History */}
        <PaymentList payments={payments} />
      </div>
    </div>
  );
};

export default PaymentSection;
