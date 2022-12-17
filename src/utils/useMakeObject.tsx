import useGraphApi from "../Api/useGraphApi";

const useMakeObject = () => {
  const { getGraph } = useGraphApi();

  const extractTimeseries = (graph: {
    [key: string]: { [key: string]: number };
  }) => {
    const timeseries: number[] = [];
    if (graph) {
      Object.entries(graph).forEach((entry) => {
        const value = Object.entries(entry[1] as { [key: string]: number });
        timeseries.push(value[0][1]);
      });
    }
    return timeseries;
  };

  const dateFormatting = (graph: {
    [key: string]: { [key: string]: number };
  }) => {
    const getDates = Object.keys(graph);
    const cutYear = getDates.map((date: string) => {
      return date.substring(5);
    });
    const changeFormat = cutYear.map((date) => {
      const day = date.slice(-2);
      const month = date.slice(0, 2);
      return day.concat(".", month);
    });
    return changeFormat;
  };

  const percentage = (v1: number, v2: number) => {
    let result = (v1 / v2) * 100;
    return 100 - result;
  };

  const rateDifference = (timeseries: number[]) => {
    const last = timeseries[timeseries.length - 1];
    const oneBeforeLast = timeseries[timeseries.length - 2];

    let calculatedAmount: number;
    if (last && oneBeforeLast) {
      calculatedAmount = (last as number) - (oneBeforeLast as number);

      const calculatedPercentage = percentage(
        oneBeforeLast as number,
        last as number
      );

      return [
        calculatedAmount.toFixed(4),
        calculatedPercentage.toFixed(2) + "%",
      ];
    }
  };

  const makeObject = (
    baseCurr: string,
    symbol: string,
    obj: { [key: string]: { [key: string]: number } }
  ) => {
    const name = symbol;
    const base = baseCurr;
    const timeseries = extractTimeseries(obj);
    const value = timeseries[timeseries.length - 1];
    const difference = rateDifference(timeseries);
    const dates = dateFormatting(obj);
    if (difference) {
      const diffAmount = difference[0];
      const diffPercentage = difference[1];
      return {
        name,
        base,
        value,
        timeseries,
        dates,
        diffAmount,
        diffPercentage,
      };
    }
  };

  const getObject = async (base: string, symbol: string) => {
    if (base && base.length > 1 && symbol && symbol.length > 1) {
      const res = await getGraph(base, symbol);
      const object = makeObject(
        base,
        symbol,
        res as { [key: string]: { [key: string]: number } }
      );
      return object;
    }
  };

  return { getObject };
};

export default useMakeObject;
