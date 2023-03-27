"use client";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import InputArea from "./InputArea";
import OutputArea from "./Outputarea";
import NamePopup from "../Forms/NamePopup";
import { decoding, encoding } from "@/common/token";
import Footer from "../Footer/Index";

const InputContainer = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReachLimit, setIsReachLimit] = useState(false);
  const [isLocalFetching, setIsLocalFetching] = useState(false);
  const [userData, setUserData] = useState<any>("");
  const [userLimit, setUserLimit] = useState<number>(userData.API_limit);
  const submitHandler = async () => {
    if (input !== "" && userLimit !== 0) {
      setOutput("");
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("OpenAI-Organization", `${process.env.ORG_KEY}`);
      myHeaders.append("Authorization", `Bearer ${process.env.API_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });

      var requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      )
        .then((response) => response.json())
        .then((result: any) => {
          if (result.choices.length) {
            setOutput(result.choices[0].message.content || "not found");
            setLoading(false);
            setInput("");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
          setInput("");
        });
      const updatedToken = { ...userData, API_limit: userLimit - 1 };
      const token = encoding(updatedToken);
      cookieCutter.set("_AcuO3", token);
      window.dispatchEvent(new Event("storage"));
      console.log(updatedToken);
    }
    if (userLimit === 0) setIsReachLimit(true);
  };

  useEffect(() => {
    setIsLocalFetching(true);
    const listenStorageChange = () => {
      if (typeof window !== "undefined") {
        const token = cookieCutter.get("_AcuO3");
        const data = decoding(token);
        if (data) {
          setUserData(data);
          setUserLimit(data.API_limit);
        }
        setIsLocalFetching(false);
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, [userData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = cookieCutter.get("_AcuO3");
      const data = decoding(token);

      if (data) {
        setUserData(data);
        setUserLimit(data.API_limit);
      }
    }
  }, []);

  return (
    <>
      {!userData && isLocalFetching && <NamePopup />}
      <div className="relative flex flex-col justify-start items-start bg-gray-800 min-h-screen">
        <div className="w-full px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-3xl text-white text-bold mt-4 ml-6 mb-4">
            Hi, {userData.name}
          </p>
          <p className="text-3xl text-white text-bold mt-4 ml-6 mb-4">
            Remaining Limit {userLimit}
          </p>
        </div>
        <div className="w-full p-3 rounded bg-gray-800 flex flex-col justify-start items-center">
          {isReachLimit && (
            <p className="text-red-500 text-xl mb-4">
              You reached your daily limit
            </p>
          )}
          <OutputArea output={output} loading={loading} />
          <InputArea
            setInput={setInput}
            submitHandler={submitHandler}
            loading={loading}
            setIsReachLimit={setIsReachLimit}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InputContainer;
