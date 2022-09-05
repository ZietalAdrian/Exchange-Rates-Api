import { FC } from "react";

import { Currency } from "./Currency";

type CountryPickerProps = {
  baseCurrency: any;
  ratesArray: any[];
  addCurrency: (n: any) => void;
};

export const CountryPicker: FC<CountryPickerProps> = ({
  baseCurrency,
  ratesArray,
  addCurrency,
}) => {
  return (
    <section className="py-4 mt-2 grid gap-2 grid-cols-6 place-items-center w-1/2 h-[520px] px-5 mx-5 overflow-scroll border-2 border-black">
      {ratesArray &&
        ratesArray.map(([name, value], index) => {
          return (
            <Currency
              key={index}
              name={name}
              value={value}
              base={baseCurrency}
              addCurrency={addCurrency}
            />
          );
        })}
    </section>
  );
};
