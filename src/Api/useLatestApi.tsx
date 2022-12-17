import { useEffect, useState } from "react";

const useLatestApi = (baseCurr: string) => {
  const [rates, setRates] = useState();

  useEffect(() => {
    if (baseCurr && baseCurr.length > 0) {
      fetch(
        "https://api.exchangerate.host/latest?" +
          new URLSearchParams({
            base: baseCurr,
            places: "4",
          })
      )
        .then((response) => response.json())
        .then((data) => setRates(data.rates));
    }
  }, [baseCurr]);

  return rates;
};

export default useLatestApi;
