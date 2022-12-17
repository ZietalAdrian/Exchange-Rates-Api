import { FC } from "react";

type CurrencyProps = {
  name: string;
  value: number;
  base: string;
  setMiddleman: (middleman: string) => void;
};

export const Currency: FC<CurrencyProps> = ({
  name,
  value,
  base,
  setMiddleman,
}) => {
  return (
    <div
      onClick={() => setMiddleman(name)}
      className="w-24 text-center p-1 border-[1px] border-black rounded-md bg-slate-100 cursor-pointer select-none"
    >
      <div className="text-xs font-bold">
        {`${name} / `}
        <span className="font-light">{base}</span>:
      </div>
      <div className="text-sm">{value}</div>
    </div>
  );
};
