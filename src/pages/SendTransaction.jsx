import React, { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import WarningIcon from "@mui/icons-material/Warning";
import { useDebounce } from "use-debounce";
const NotConnected = () => {
  return (
    <>
      <WarningIcon sx={{ height: "80px", width: "80px" }} />
      <p className="font-semibold">Vui lòng Connect Wallet</p>
      <a href="/" className="bg-gray-200 rounded-lg px-4 py-2 ">
        Connect Wallet
      </a>
    </>
  );
};
const InputForm = ({ value, setValue, label = "", placeholder = "" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold" htmlFor={label}>
        {label}
      </label>
      <input
        className="rounded-lg w-[400px] px-4 py-2"
        type="text"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        required
      />
    </div>
  );
};
const Send = () => {
  const [to, setTo] = useState("");
  const [debounceTo] = useDebounce(to, 500);
  const [amount, setAmount] = useState("");
  const [debounceAmount] = useDebounce(amount, 500);

  const { disconnect } = useDisconnect();

  const handleSend = () => {
    console.log(
      "🚀 ~ file: SendTransaction.jsx:41 ~ Send ~ debounceAmount:",
      debounceAmount
    );
    console.log(
      "🚀 ~ file: SendTransaction.jsx:39 ~ Send ~ debounceTo:",
      debounceTo
    );
    setTo("");
    setAmount("");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mx-auto font-bold text-2xl">Send Transaction</h1>
      <InputForm
        placeholder="0xA0Cf...251e"
        label="Recipient"
        value={to}
        setValue={setTo}
      />
      <InputForm
        placeholder="0.05"
        label="Amount"
        value={amount}
        setValue={setAmount}
      />
      <button
        onClick={handleSend}
        className="w-full px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold"
      >
        Send
      </button>
      <button
        onClick={disconnect}
        className="w-full px-4 py-2 bg-red-500 rounded-lg text-white font-semibold"
      >
        Disconnected
      </button>
    </div>
  );
};

const SendTransaction = () => {
  const { address, connector, isConnected } = useAccount();
  return (
    <div className="absolute  w-fit flex flex-col items-center gap-2 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
      {isConnected ? <Send /> : <NotConnected />}
    </div>
  );
};

export default SendTransaction;
