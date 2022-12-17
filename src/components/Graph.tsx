import { useEffect, useState, FC } from "react";
import { Line } from "react-chartjs-2";
import Chart, { ChartData } from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

type currObj = {
  name: string;
  base: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
  timeseries: number[];
  dates: string[];
};

type GraphProps = {
  obj: currObj;
  big?: boolean;
  setAddFavCurr?: (addFavCurr: boolean) => void;
};

const Graph: FC<GraphProps> = ({ obj, big = false, setAddFavCurr }) => {
  const [graphData, setGraphData] = useState<ChartData<"line", unknown>>();

  const { name, base, timeseries, dates, diffAmount, diffPercentage } = obj;

  useEffect(() => {
    obj &&
      setGraphData({
        labels:
          dates && dates.length > 1
            ? dates.map((date: string) => date)
            : undefined,
        datasets: [
          {
            label: `${name} / ${base}`,
            data:
              timeseries && timeseries.length > 1
                ? timeseries.map((data: number) => data)
                : [null],
            borderColor: "rgba(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235)",
          },
        ],
      });
  }, [obj]);

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
          {`${name} / `}
          <span className="text-sm font-light">{base}</span>
        </div>
        <div
          className={`flex ${
            diffAmount && diffAmount[0] === "-"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          <span>
            {diffAmount &&
              (diffAmount[0] === "-" ? diffAmount.slice(1) : diffAmount)}
          </span>
          <span className="pl-5">
            {diffPercentage &&
              (diffPercentage[0] === "-"
                ? diffPercentage.slice(1)
                : diffPercentage)}
          </span>
        </div>
        <button
          onClick={() => setAddFavCurr && setAddFavCurr(true)}
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
