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
    let x = (v1 / v2) * 100;
    return 100 - x;
  };

  const rateDifference = (name: string) => {
    const aaa: any =
      graph && Object.entries(graph)[Object.entries(graph).length - 1];
    const last = Object.entries(aaa[1]).find((entry: any) => {
      return entry[0] === name;
    });
    const bbb: any =
      graph && Object.entries(graph)[Object.entries(graph).length - 2];
    const oneBeforeLast = Object.entries(bbb[1]).find((entry: any) => {
      return entry[0] === name;
    });
    let result: any;
    if (last && oneBeforeLast) {
      result = (last[1] as number) - (oneBeforeLast[1] as number);

      const zzz = percentage(oneBeforeLast[1] as number, last[1] as number);
      return [result.toFixed(4), zzz.toFixed(2) + "%"];
    }
  };

  const policz = (obj: any) => {
    const xxx: currObj = obj.map((item: any) => {
      const { name, value } = item;
      const difference = rateDifference(item.name);
      if (difference) {
        const diffAmount = difference[0];
        const diffPercentage = difference[1];
        return { name, value, diffAmount, diffPercentage };
      }
    });
    return xxx;
  };

  return { doPropertiesOnObject, policz, rateDifference };
};

export default useRateDifference;
