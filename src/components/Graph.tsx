import { useEffect, useState, FC } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useRateDifference from "../utils/useRateDifference";

Chart.register(CategoryScale);

type GraphProps = {
  graph: any;
  baseCurr: string;
  wanted: string;
  big?: boolean;
  setAddFavCurr?: (addFavCurr: string) => void;
};

const Graph: FC<GraphProps> = ({
  graph,
  baseCurr: baseCurr,
  wanted,
  big = false,
  setAddFavCurr,
}) => {
  const [graphData, setGraphData] = useState<any>(null);

  const { rateDifference } = useRateDifference(graph);

  const getValues = (searchedCurrency: string) => {
    let values: number[] = [];

    graph &&
      Object.entries(graph).forEach((entry) => {
        const found =
          graph &&
          Object.entries(entry[1] as [string, number]).find((ent) => {
            return ent[0] === searchedCurrency;
          });
        values.push(found[1]);
      });
    return values;
  };
  const timeSeries = graph && getValues(wanted);

  const difference = rateDifference(wanted);

  const dateFormatting = () => {
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
  const dates = graph && dateFormatting();

  useEffect(() => {
    setGraphData({
      labels: dates && dates.length > 1 && dates.map((date: any) => date),
      datasets: [
        {
          label: `${wanted} / ${baseCurr}`,
          data:
            timeSeries &&
            timeSeries.length > 1 &&
            timeSeries.map((data: any) => data),
          borderColor: "rgba(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235)",
        },
      ],
    });
  }, [graph, wanted, baseCurr]);

  const options = big
    ? {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    : {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
          y: {
            ticks: {
              display: false,
            },
          },
        },
        events: [],
      };

  return big ? (
    <section className="mt-2 p-1 border-2 border-black h-[250px] w-[450px] sm:w-[600px] md:w-[500px] lg:w-[600px] lg:mr-4  xl:w-[660px]">
      <div className="h-[27px] pl-2 flex justify-between border-b-[1px] border-black border-dotted">
        <div className="text-base font-normal">
          {`${wanted} / `}
          <span className="text-sm font-light">{baseCurr}</span>
        </div>
        <div
          className={`flex ${
            difference && difference[0][0] === "-"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          <span>
            {difference &&
              (difference[0][0] === "-"
                ? difference[0].slice(1)
                : difference[0])}
          </span>
          <span className="pl-5">
            {difference &&
              (difference[1][0] === "-"
                ? difference[1].slice(1)
                : difference[1])}
          </span>
        </div>
        <button
          onClick={() => setAddFavCurr!(wanted)}
          className="text-black bg-slate-200 w-[150px] border-[1px] border-black rounded-lg mb-1 text-sm"
        >
          add to favorites
        </button>
      </div>
      <div className="h-[210px] mt-1">
        {graphData && <Line data={graphData} options={options} />}
      </div>
    </section>
  ) : (
    <section className="w-[115px] border-[0.2px] border-black rounded-lg overflow-hidden ">
      <div className="h-[70px] w-[125px] p-1 relative -left-2 -top-2 pt-2 sm:w-[108px] md:w-[125px]">
        {graphData && <Line data={graphData} options={options} />}
      </div>
    </section>
  );
};

export default Graph;
