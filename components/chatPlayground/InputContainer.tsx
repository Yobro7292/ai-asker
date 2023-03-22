"use client";
import { useState } from "react";
import InputArea from "./InputArea";
import OutputArea from "./Outputarea";

const InputContainer = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (input !== "") {
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
    }
  };
  return (
    <div className="flex flex-col justify-start items-start bg-gray-800 min-h-screen">
      <p className="text-3xl text-white text-bold mt-4 ml-6">
        AI Asker with GPT-3
      </p>
      <div className="w-full p-3 rounded bg-gray-800 flex flex-col justify-start items-center">
        <OutputArea output={output} loading={loading} />
        <InputArea
          setInput={setInput}
          submitHandler={submitHandler}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InputContainer;
