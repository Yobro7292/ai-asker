"use client";

import { useState } from "react";
import cookieCutter from "cookie-cutter";
import { encoding } from "@/common/token";

const NamePopup = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onSubmitHandler = () => {
    if (typeof window !== "undefined") {
      if (name) {
        const data = {
          name: name,
          API_limit: 5,
        };
        const token = encoding(data);
        cookieCutter.set("_AcuO3", token);
        window.dispatchEvent(new Event("storage"));
        setError("");
      } else {
        setError("Please enter your name");
      }
    }
  };
  return (
    <section className="w-full h-full rounded-3xl shadow-2xl flex flex-col justify-center items-center">
      <div className="absolute bg-black min-h-screen w-full top-0 left-0 z-10 opacity-70"></div>
      <div className="absolute top-[25%] left-0 mx-4 md:mx-0 md:left-[30%] p-8 text-center md:p-12 z-10 flex flex-col justify-center items-center bg-gray-700 rounded-xl">
        <p className="text-sm tracking-widest text-white">
          Welcome to Ai Asker
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          Can you please provide your name?
        </h2>

        <input
          className={`mt-8 inline-block w-full rounded-md py-4 px-6 font-bold shadow-xl focus:border-none focus:outline:none text-xl bg-white text-black ${
            error ? "border border-red-500 bg-red-200" : "border-none"
          }`}
          type="text"
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
          placeholder={error ? error : ""}
        />
        <button
          className="mt-8 inline-block w-1/2 md:w-1/4 rounded-full py-3 px-6 bg-blue-600 font-bold shadow-xl focus:border-none focus:outline:none text-xl text-white"
          type="button"
          onClick={onSubmitHandler}
        >
          Submit{" "}
        </button>
      </div>
    </section>
  );
};

export default NamePopup;
