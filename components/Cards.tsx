"use client";
interface Props {
  title: string;
  description: string;
  rank: number;
}
const Cards = ({ title, description, rank }: Props) => {
  return (
    <div className="relative flex items-start justify-between rounded-xl border border-gray-700 p-4 shadow-xl sm:p-6 lg:p-8 bg-transparent">
      <div className="pt-4">
        <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
          {title}
        </h3>

        <p className="mt-2 hidden text-sm sm:block">{description}</p>
      </div>

      <span
        className={`rounded-full px-3 py-1.5 text-xs font-medium text-blue-600 ${
          rank < 3
            ? "bg-red-300"
            : rank >= 3 && rank < 4.5
            ? "bg-blue-300"
            : "bg-green-300"
        }`}
      >
        {rank}
      </span>
    </div>
  );
};

export default Cards;
