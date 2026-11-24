import { Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { FiZap } from "react-icons/fi";
import { Link, useOutletContext } from "react-router-dom";
import { useGetUserWalletdata } from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import {
  useEstateUtilities,
  usePayUtitlity,
  type EstateUtility,
} from "../../hooks/estateCommunity/useEstateCommunity";

const ANNUAL_CODES = ["annual_service_charge", "annual_capital_charge"];

const isAnnual = (code: string) => ANNUAL_CODES.includes(code);

const UtilityPayment: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const estateId = context.data?.estate_info.id;
  const { data: wallet, isLoading } = useGetUserWalletdata();
  const { data: utilities, isLoading: utilitiesLoading } = useEstateUtilities(estateId);
  const { mutate, isPending } = usePayUtitlity();
  const [selectedCode, setSelectedCode] = useState("electricity");
  const [meter, setMeter] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"virtual_wallet" | "bank_transfer">("virtual_wallet");
  const [bankName, setBankName] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [confirming, setConfirming] = useState(false);

  const items = utilities?.data ?? [];
  const selected =
    items.find((item) => item.code === selectedCode) ?? items[0];
  const isElectricity = selected?.code === "electricity";
  const annual = !!selected && isAnnual(selected.code);
  const unitPrice = Number(selected?.unit_price);
  const hasPrice = isElectricity && Number.isFinite(unitPrice) && unitPrice > 0;
  const balanceDue = Number(selected?.balance_due ?? 0);
  const balance = Number(wallet?.wallet_balance || 0);
  const value = Number(amount) || 0;
  const units = hasPrice && value > 0 ? value / unitPrice : 0;
  const walletMethod = isElectricity || method === "virtual_wallet";
  const remaining = balance - value;
  const canPay =
    !!estateId &&
    !!selected &&
    value >= 1 &&
    !isPending &&
    (isElectricity
      ? meter.trim().length > 0 && hasPrice && remaining >= 0
      : annual &&
        balanceDue > 0 &&
        value <= balanceDue &&
        (walletMethod ? remaining >= 0 : bankName.trim().length > 0 && !!proof));

  const selectUtility = (item: EstateUtility) => {
    setSelectedCode(item.code);
    setConfirming(false);
    if (item.code === "electricity") setMethod("virtual_wallet");
  };

  const pay = () => {
    if (!estateId || !selected || !canPay) return;
    mutate(
      {
        estate_id: estateId,
        amount: value,
        payment_type: selected.code,
        payment_method: walletMethod ? "virtual_wallet" : "bank_transfer",
        chargeable_id: isElectricity
          ? meter.trim()
          : String(new Date().getFullYear()),
        bank_name: !walletMethod ? bankName.trim() : undefined,
        proof_of_payment: !walletMethod ? proof || undefined : undefined,
      },
      {
        onSuccess: () => {
          setConfirming(false);
          setMeter("");
          setAmount("");
          setBankName("");
          setProof(null);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
            Utilities
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#032147]">
            Estate utility payments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Buy electricity with your wallet, or pay a service or capital charge
            with your wallet or a bank transfer.
          </p>
          <Link
            to="/dashboard/estate/utility-history"
            className="mt-3 inline-flex text-sm font-semibold text-[#209dd7] hover:underline"
          >
            View payment history
          </Link>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#032147] px-4 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Wallet2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-white/70">Wallet balance</p>
            <p className={`text-lg font-bold ${isLoading ? "animate-pulse" : ""}`}>
              {isLoading ? "Loading..." : formatPrice(balance)}
            </p>
          </div>
        </div>
      </div>

      <form
        className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canPay) setConfirming(true);
        }}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {utilitiesLoading && (
            <p className="text-sm text-gray-500 sm:col-span-3">Loading utilities...</p>
          )}
          {items.map((item) => {
            const active = selected?.code === item.code;
            const detail =
              item.code === "electricity"
                ? item.unit_price
                  ? `${formatPrice(item.unit_price)} per unit`
                  : "Unit price unavailable"
                : `Due ${formatPrice(item.balance_due || 0)}`;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => selectUtility(item)}
                className={`rounded-2xl border px-4 py-3 text-left ${
                  active
                    ? "border-[#79B833] bg-[#79B833]/10"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="font-semibold text-[#032147]">{item.name}</p>
                <p className="mt-1 text-xs text-gray-500">{detail}</p>
              </button>
            );
          })}
        </div>

        {isElectricity && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#79B833]/15 text-[#79B833]">
                <FiZap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-[#032147]">Electricity</p>
                <p className="text-sm text-gray-500">
                  {hasPrice
                    ? `${formatPrice(unitPrice)} per unit. Payment is taken from your wallet.`
                    : "Unit price is unavailable"}
                </p>
              </div>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Meter number</span>
              <input
                value={meter}
                onChange={(event) => setMeter(event.target.value)}
                placeholder="Enter meter number"
                className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
              />
            </label>
          </>
        )}

        {annual && selected && (
          <div className="space-y-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm">
            <Row label="Amount due" value={formatPrice(selected.amount_due || 0)} />
            <Row label="Already paid" value={formatPrice(selected.amount_paid || 0)} />
            <Row label="Outstanding" value={formatPrice(balanceDue)} />
          </div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Amount</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
            inputMode="decimal"
            placeholder="Enter amount"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
          />
        </label>

        {isElectricity && (
          <div className="space-y-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm">
            <Row label="Units" value={units.toFixed(2)} />
            <Row label="Total" value={formatPrice(value)} />
            <Row label="Balance after purchase" value={formatPrice(Math.max(remaining, 0))} />
          </div>
        )}

        {annual && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Payment method</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <MethodButton
                active={method === "virtual_wallet"}
                label="Wallet"
                detail="Debited immediately"
                onClick={() => setMethod("virtual_wallet")}
              />
              <MethodButton
                active={method === "bank_transfer"}
                label="Bank transfer"
                detail="Confirmed by admin"
                onClick={() => setMethod("bank_transfer")}
              />
            </div>
            {method === "bank_transfer" && (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">Bank name</span>
                  <input
                    value={bankName}
                    onChange={(event) => setBankName(event.target.value)}
                    placeholder="Bank you transferred from"
                    className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">Proof of payment</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,application/pdf"
                    onChange={(event) => setProof(event.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#032147] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                </label>
              </>
            )}
            {method === "virtual_wallet" && (
              <Row label="Balance after payment" value={formatPrice(Math.max(remaining, 0))} />
            )}
          </div>
        )}

        {walletMethod && value > 0 && remaining < 0 && (
          <p className="text-sm text-red-600">
            Your wallet does not have enough for this payment.
          </p>
        )}
        {annual && balanceDue <= 0 && (
          <p className="text-sm text-gray-500">
            You have no outstanding balance for this charge.
          </p>
        )}
        {annual && balanceDue > 0 && value > balanceDue && (
          <p className="text-sm text-red-600">
            Amount cannot exceed the outstanding balance of {formatPrice(balanceDue)}.
          </p>
        )}

        <button
          type="submit"
          disabled={!canPay}
          className="h-12 w-full rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          {value > 0
            ? walletMethod
              ? `Pay ${formatPrice(value)} with wallet`
              : `Submit ${formatPrice(value)} bank transfer`
            : "Continue"}
        </button>
      </form>

      {confirming && selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h4 className="text-lg font-bold text-[#032147]">
              {walletMethod ? "Confirm wallet payment" : "Submit bank transfer"}
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {walletMethod
                ? `If you continue, your wallet will be debited ${formatPrice(value)} for ${selected.name}${
                    isElectricity ? ` on meter ${meter.trim()}` : ""
                  }. The amount is taken from your wallet as soon as you confirm.`
                : `If you continue, ${formatPrice(value)} for ${selected.name} will be sent for admin confirmation. Your wallet is not debited. The charge is updated after the receipt is approved.`}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setConfirming(false)}
                className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Go back
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={pay}
                className="h-11 flex-1 rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-300"
              >
                {isPending ? "Sending..." : walletMethod ? "Confirm and pay" : "Submit transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function MethodButton({
  active,
  label,
  detail,
  onClick,
}: {
  active: boolean;
  label: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left ${
        active ? "border-[#79B833] bg-[#79B833]/10" : "border-gray-200"
      }`}
    >
      <p className="font-semibold text-[#032147]">{label}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-[#032147]">{value}</span>
    </div>
  );
}

export default UtilityPayment;
