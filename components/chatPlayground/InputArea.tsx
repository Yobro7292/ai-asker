"use client";
const InputArea = ({
  setInput,
  submitHandler,
  loading,
  setIsReachLimit,
}: any) => {
  return (
    <div className="relative w-full mt-4">
      <input
        type="text"
        id="large-input"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ask me anything..."
        onChange={(e) => {
          setInput(e.target.value);
          setIsReachLimit(false);
        }}
      />
      <button
        className="px-4 py-1 bg-blue-700 text-white rounded-md absolute right-0 mr-3 top-[20%] focus:outline-none disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={(e) => {
          submitHandler();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default InputArea;
