import { FC, useEffect } from "react";
import { useDrag } from "react-dnd";

import Graph from "./Graph";

type currObj = {
  name: string;
  base: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
  timeseries: number[];
  dates: string[];
};

type FavoritesCurrencyProps = {
  obj: currObj;
  setTrash: (trash: boolean) => void;
  setMiddleman: (middleman: currObj) => void;
};

const FavoritesCurrency: FC<FavoritesCurrencyProps> = ({
  obj,
  setTrash,
  setMiddleman,
}) => {
  const { name, base, value, diffAmount, diffPercentage } = obj;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FavCurr",
    item: { base: base, name: name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setTrash(isDragging ? true : false);
  }, [isDragging]);

  return (
    <div
      ref={drag}
      onClick={() => setMiddleman(obj)}
      className="flex justify-between text-center p-1 border-[1px] border-black rounded-md bg-slate-100 cursor-pointer select-none h-16 w-[380px] sm:w-[280px] md:w-[380px] lg:w-[280px] xl:w-[300px]"
    >
      <div className="flex flex-col w-[100px] pt-1">
        <div className="text-base font-normal">
          {`${name} / `}
          <span className="text-sm font-light">{base}</span>:
        </div>
        <span>{value}</span>
      </div>
      <div
        className={`flex flex-col w-[100px] pt-1 pr-2 ${
          diffAmount && diffAmount[0] === "-"
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        <span>
          {diffPercentage && diffPercentage[0] === "-"
            ? diffPercentage.slice(1)
            : diffPercentage}
        </span>
        <span>
          {diffAmount && diffAmount[0] === "-"
            ? diffAmount.slice(1)
            : diffAmount}
        </span>
      </div>
      {obj && <Graph obj={obj}></Graph>}
    </div>
  );
};

export default FavoritesCurrency;
