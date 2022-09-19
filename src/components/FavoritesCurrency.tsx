import { FC } from "react";
import Graph from "./Graph";

type FavoritesCurrencyProps = {
  name: string;
  value: number;
  baseCurr: string;
  diffAmount: string;
  diffPercentage: string;
  graph?: { [key: string]: { [key: string]: number } } | [];
  setId: (id: string) => void;
};

const FavoritesCurrency: FC<FavoritesCurrencyProps> = ({
  name,
  value,
  baseCurr,
  graph,
  diffAmount = "",
  diffPercentage = "",
  setId,
}) => {

  return (
    <div
      onClick={() => setId(name)}
      className="flex justify-between text-center p-1 border-[1px] border-black rounded-md bg-slate-100 cursor-pointer select-none h-16 w-[380px] sm:w-[280px] md:w-[380px] lg:w-[300px]"
    >
      <div className="flex flex-col w-[100px] pt-1">
        <div className="text-base font-normal">
          {`${name} / `}
          <span className="text-sm font-light">{baseCurr}</span>:
        </div>
        <span>{value}</span>
      </div>
      <div
        className={`flex flex-col w-[100px] pt-1 pr-2 ${
          diffAmount[0] === "-" ? "text-red-500" : "text-green-500"
        }`}
      >
        <span>
          {diffPercentage[0] === "-" ? diffPercentage.slice(1) : diffPercentage}
        </span>
        <span>{diffAmount[0] === "-" ? diffAmount.slice(1) : diffAmount}</span>
      </div>
      {graph && <Graph graph={graph} baseCurr={baseCurr} wanted={name}></Graph>}
    </div>
  );
};

export default FavoritesCurrency;
