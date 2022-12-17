const useGraphApi = () => {
  const actualDate = new Date().toISOString().slice(0, 10);
  const subtractMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().slice(0, 10);
  };
  const startDate = subtractMonth();

  const getGraph = (baseCurr: string, symbol: string) => {
    if (baseCurr && baseCurr.length > 0 && symbol && symbol.length > 0) {
      return new Promise((resolve) => {
        fetch(
          "https://api.exchangerate.host/timeseries?" +
            new URLSearchParams({
              base: baseCurr,
              start_date: startDate,
              end_date: actualDate,
              places: "4",
              symbols: symbol,
            })
        )
          .then((response) => response.json())
          .then((data) => {
            resolve(data.rates);
          })
          .catch((err) => console.log(err));
      });
    }
  };
  return { getGraph };
};
export default useGraphApi;
