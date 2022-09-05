import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

const Graph = ({ chartData }: { chartData: any }) => {
  Chart.register(CategoryScale);
  return (
    <div className="w-[620px] h-[250px] mt-2 p-1 border-2 border-black">
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default Graph;
