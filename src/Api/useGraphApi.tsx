import { useEffect, useState } from "react";

const useGraphApi = (startDate: string, baseCurr: string) => {
  const [graph, setGraph] = useState<{[key: string]: {[key: string]: number}} | []>([]);

  let actualDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    fetch(
      "https://api.exchangerate.host/timeseries?" +
        new URLSearchParams({
          base: baseCurr,
          start_date: startDate,
          end_date: actualDate,
          places: "4",
        })
    )
      .then((response) => response.json())
      .then((data) => setGraph(data.rates))
      .catch((err) => console.log(err));
  }, [baseCurr]);

  return graph;
};
export default useGraphApi;
