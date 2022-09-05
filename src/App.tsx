import { useEffect, useState } from "react";

import useGraphApi from "./Api/useGraphApi";
import useRatesApi from "./Api/useRatesApi";
import { CountryPicker } from "./components/CountryPicker";
import Favorites from "./components/Favorites";
import Graph from "./components/Graph";

function App() {
  const [formularz, setFormularz] = useState<any>("USD");
  const [ratesArray, setRatesArray] = useState<any[]>([]);
  const [favoritesCurrency, setFavoritesCurrency] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any>(null);

  const baseCurrency = formularz.length < 3 ? "USD" : formularz;
  const rates = useRatesApi(baseCurrency);
  const graph: any = useGraphApi();

  const onChange = (e: any) => {
    let value: any = e.target.value.toUpperCase();
    value = value.length > 3 ? value.slice(0, 3) : value;
    setFormularz(value);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    asyncFunction()
      .then((res) => setRatesArray(res))
      .then(() => setFavoritesCurrency(something));

    graph &&
      setGraphData({
        labels: dates && dates.length > 1 && dates.map((date: any) => date),
        datasets: [
          {
            label: `${wanted} / ${baseCurrency}`,
            data:
              timeSeries &&
              timeSeries.length > 1 &&
              timeSeries.map((data) => data),
            borderColor: "rgba(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235)",
          },
        ],
      });
  }, [rates, graph]);

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

  //---------------
  const wanted = "PLN";
  const getValues = (searchedCurrency: string) => {
    let values: number[] = [];

    graph &&
      Object.entries(graph).map((entry) => {
        const found =
          graph &&
          Object.entries(entry[1] as [string, number]).find((ent) => {
            return ent[0] === searchedCurrency;
          });
        values.push(found[1]);
      });
    return values;
  };
  const timeSeries = getValues(wanted);

  //------------------------------------------------------------------
  const initialFavorites: string[] = ["USD", "PLN", "EUR", "GBP"];
  const something = () => {
    let result: any[] = [];
    ratesArray &&
      ratesArray.length > 1 &&
      initialFavorites.forEach((curr) => {
        result.push(
          ratesArray.find((name) => {
            return name[0] === curr;
          })
        );
      });
    return result;
  };
  const asyncFunction = async () => {
    const response = await (rates && Object.entries(rates));
    return await response;
  };

  //------------------------------------------------------------------
  const addCurrency = (n: any) => {
    const found =
      ratesArray &&
      ratesArray.find(([name]: [string]) => {
        return name === n;
      });
    setFavoritesCurrency((prev: any) => {
      return [...new Set([...prev, found])];
    });
  };

  const removeCurrency = (x: any) => {
    const newArr = favoritesCurrency.filter(([name]: [string]) => {
      return name !== x;
    });
    setFavoritesCurrency(newArr);
  };
  //------------------------------------------------------------------
  return (
    <div>
      <header className="flex justify-center">
        <h1 className="uppercase mt-10 text-xl border-b-2 border-black border-solid px-96 pb-2">
          exchange rates api
        </h1>
      </header>
      <div>
        <form className="ml-8" onSubmit={handleOnSubmit}>
          <label>
            Currency:
            <input
              className="bg-slate-300 rounded-lg pl-3 ml-1 text-sm w-14 outline-none"
              onChange={onChange}
              type="text"
              name="currency"
              value={formularz}
            />
          </label>
        </form>
      </div>
      <div className="flex ">
        <CountryPicker
          baseCurrency={baseCurrency}
          ratesArray={ratesArray}
          addCurrency={addCurrency}
        />
        <div>
          {graphData && <Graph chartData={graphData} />}
          <Favorites
            favoritesCurrency={favoritesCurrency!}
            baseCurrency={baseCurrency}
            removeCurrency={removeCurrency}
          />
        </div>
      </div>
    </div>
  );
}

export default App;