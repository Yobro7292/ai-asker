"use client";
const OutputArea = ({
  output,
  loading,
}: {
  output: string;
  loading: boolean;
}) => {
  return (
    <>
      <textarea
        id="message"
        rows={15}
        className="block resize-none text-justify overflow-auto p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border !border-none focus:ring-none focus:border-none dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
        placeholder=""
        readOnly
        value={loading ? "Wait I am thinking..." : output}
      ></textarea>
    </>
  );
};

export default OutputArea;
