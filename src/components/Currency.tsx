import { FC } from "react";

type CurrencyProps = {
  name: string;
  value: number;
  base: string;
  favorite?: boolean;
  addCurrency?: (n: any) => void;
  removeCurrency?: (n: any) => void;
};

export const Currency: FC<CurrencyProps> = ({
  name,
  value,
  base,
  favorite,
  addCurrency,
  removeCurrency,
}) => {
  return (
    <>
      {favorite ? (
        <div
          className="w-32 text-center p-1 border-[1px] border-black rounded-md bg-slate-100 cursor-pointer select-none"
          onClick={() => removeCurrency!(name)}
        >
          <div>
            {`${name} / `}
            <span className="text-xs">{base}</span>:
          </div>
          <div className="text-lg ">{value}</div>
        </div>
      ) : (
        <div
          className="w-24 text-center p-1 border-[1px] border-black rounded-md bg-slate-100 cursor-pointer select-none"
          onClick={() => addCurrency!(name)}
        >
          <div className="text-xs font-bold">
            {`${name} / `}
            <span className="font-light">{base}</span>:
          </div>
          <div className="text-sm">{value}</div>
        </div>
      )}
    </>
  );
};
