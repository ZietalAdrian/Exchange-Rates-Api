import { FC, useEffect, useState } from "react";

import { Currency } from "./Currency";

type CountryPickerProps = {
  baseCurr: string;
  rates: { [key: string]: number };
  setId: (id: string) => void;
  searchedCurr?: string;
};

const CountryPicker: FC<CountryPickerProps> = ({
  baseCurr,
  rates,
  setId,
  searchedCurr,
}) => {
  const [baseArray, setBaseArray] = useState<{ [key: string]: number }>();
  const [resultArray, setResultArray] = useState<{ [key: string]: number }>();

  useEffect(() => {
    setBaseArray(rates);
  }, [rates]);

  useEffect(() => {
    const changedToArray = baseArray && Object.entries(baseArray);

    const filterArray =
      searchedCurr &&
      changedToArray &&
      changedToArray.filter((key) => {
        return key[0].includes(searchedCurr.toUpperCase());
      });

    const filteredArray = filterArray && Object.fromEntries(filterArray);

    setResultArray(filteredArray && searchedCurr ? filteredArray : baseArray);
    
  }, [searchedCurr, baseArray]);

  return (
    <section className="h-[520px] py-4 mt-2 place-items-center grid gap-2 px-10 content-start overflow-scroll border-2 border-black  grid-cols-3  sm:grid-cols-4 md:grid-cols-2 md:px-5 lg:px-2 lg:ml-1 lg:grid-cols-4  xl:grid-cols-6 xl:px-1">
      {resultArray &&
        Object.entries(resultArray).map((rate, index: number) => {
          return (
            <Currency
              key={index}
              name={rate[0] as string}
              value={rate[1] as number}
              base={baseCurr}
              setId={setId}
            />
          );
        })}
    </section>
  );
};

export default CountryPicker;
