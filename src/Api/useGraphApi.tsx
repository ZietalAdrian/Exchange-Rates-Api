import { useEffect, useState } from "react";

const useGraphApi = (startDate: string, formularz: string) => {
  const [graph, setGraph] = useState<{[key: string]: {[key: string]: number}} | []>([]);

  let actualDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    fetch(
      "https://api.exchangerate.host/timeseries?" +
        new URLSearchParams({
          base: formularz,
          start_date: startDate,
          end_date: actualDate,
          places: "4",
        })
    )
      .then((response) => response.json())
      .then((data) => setGraph(data.rates))
      .catch((err) => console.log(err));
  }, [formularz]);

  return graph;
};
export default useGraphApi;
