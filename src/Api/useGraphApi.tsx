import { useEffect, useState } from "react";

const useGraphApi = () => {
  const [graph, setGraph] = useState();

  useEffect(() => {
    fetch(
      "https://api.exchangerate.host/timeseries?" +
        new URLSearchParams({
          base: "USD",
          start_date: "2022-08-29",
          end_date: "2022-09-04",
        })
    )
      .then((response) => response.json())
      .then((data) => setGraph(data.rates))
      .catch((err) => console.log(err));
  }, []);

  return graph;
};
export default useGraphApi;
