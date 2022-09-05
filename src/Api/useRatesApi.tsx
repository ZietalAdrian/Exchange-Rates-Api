import { useEffect, useState } from "react";

const useRatesApi = (baseCurr: string) => {
  const [rates, setRates] = useState<any>();

  useEffect(() => {
    fetch(
      "https://api.exchangerate.host/latest?" +
        new URLSearchParams({
          base: baseCurr,
            places: "5", 
        })
    )
      .then((response) => response.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.log(err));
  }, [baseCurr]);

  return rates;
};

export default useRatesApi;