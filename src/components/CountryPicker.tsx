import { FC, useEffect } from "react";

import { Currency } from "./Currency";

type CountryPickerProps = {
  formularz: string;
  rates: any;
  setId: (id: string) => void;
  searchedCurr: any;
};

const CountryPicker: FC<CountryPickerProps> = ({
  formularz,
  rates,
  setId,
  searchedCurr,
}) => {
  
  const qwe = Object.entries(rates);
  
  const asd =
  searchedCurr &&
  qwe.filter((key) => {
    return key[0].includes(searchedCurr.toUpperCase());
  });
  const zxc = asd && Object.fromEntries(asd);
  rates = searchedCurr ? rates = zxc : rates
  
  useEffect(() => {}, [searchedCurr]);

  return (
    <section className="py-4 mt-2 place-items-center grid gap-2 px-10 content-start overflow-scroll border-2 border-black  h-[520px] grid-cols-3 sm:bg-green-600 md:grid-cols-3 md:bg-red-600 lg:grid-cols-5 lg:bg-gray-600 xl:bg-white xl:grid-cols-6 xl:px-5">
      {rates &&
        Object.entries(rates).map((rate, index: number) => {
          return (
            <Currency
              key={index}
              name={rate[0] as string}
              value={rate[1] as number}
              base={formularz}
              setId={setId}
            />
          );
        })}
    </section>
  );
};

export default CountryPicker;