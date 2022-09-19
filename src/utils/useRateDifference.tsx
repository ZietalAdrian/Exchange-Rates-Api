type currObj = {
  name: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
};

const useRateDifference = (graph: any) => {
  const doPropertiesOnObject = (obj: any) => {
    const result: currObj[] = obj.map((item: any) => {
      return {
        name: item[0],
        value: item[1],
      };
    });
    return result;
  };

  const percentage = (v1: number, v2: number) => {
    let result = (v1 / v2) * 100;
    return 100 - result;
  };

  const rateDifference = (name: string) => {
    const last: any =
      graph && Object.entries(graph)[Object.entries(graph).length - 1];
    const findLast = Object.entries(last[1]).find((entry: any) => {
      return entry[0] === name;
    });
    const oneBeforeLast: any =
      graph && Object.entries(graph)[Object.entries(graph).length - 2];
    const findOneBeforeLast = Object.entries(oneBeforeLast[1]).find((entry: any) => {
      return entry[0] === name;
    });
    let calculatedAmount: any;
    if (findLast && findOneBeforeLast) {
      calculatedAmount = (findLast[1] as number) - (findOneBeforeLast[1] as number);

      const calculatedPercentage = percentage(findOneBeforeLast[1] as number, findLast[1] as number);
      return [calculatedAmount.toFixed(4), calculatedPercentage.toFixed(2) + "%"];
    }
  };

  const makeObject = (obj: any) => {
    const object: currObj = obj.map((item: any) => {
      const { name, value } = item;
      const difference = rateDifference(item.name);
      if (difference) {
        const diffAmount = difference[0];
        const diffPercentage = difference[1];
        return { name, value, diffAmount, diffPercentage };
      }
    });
    return object;
  };

  return { doPropertiesOnObject, makeObject, rateDifference };
};

export default useRateDifference;
