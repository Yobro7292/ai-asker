import { PropsWithRef, useState } from "react";

const Form = ({ setCards, cards }: any) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [rank, setRank] = useState<number>();

  const setData = () => {
    const data = {
      title,
      description,
      rank,
    };
    setCards([...cards, data]);
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Add New Card!</h1>
      </div>

      <div className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div className="relative">
          <span className="ml-2 text-medium">Title</span>
          <input
            className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="relative">
          <span className="ml-2 text-medium">Description</span>
          <input
            className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Brief info"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="relative">
          <span className="ml-2 text-medium">Rank</span>
          <input
            className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Out of 5.0"
            onChange={(e) => {
              setRank(Number(e.target.value));
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-700 px-8 py-3 text-sm font-medium text-white"
            onClick={setData}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
