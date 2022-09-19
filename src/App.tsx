import { useState, ChangeEvent, FormEvent } from "react";

import useGraphApi from "./Api/useGraphApi";
import CountryPicker from "./components/CountryPicker";
import Favorites from "./components/Favorites";
import Graph from "./components/Graph";

function App() {
  const [baseCurr, setBaseCurr] = useState<string>("USD");
  const [id, setId] = useState<string>("GBP");
  const [searchedCurr, setSearchedCurr] = useState<string>();
  const [addFavCurr, setAddFavCurr] = useState<string>();

  const subtractWeek = () => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().slice(0, 10);
  };
  const subtractMonth = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().slice(0, 10);
  };

  const graph: { [key: string]: { [key: string]: number } } | [] = useGraphApi(
    subtractMonth(),
    baseCurr
  );

  const latestRates: any =
    graph &&
    graph.length !== 0 &&
    Object.entries(graph)[Object.entries(graph).length - 1][1];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.length > 3 ? value.slice(0, 3) : value;
    setBaseCurr((prev) => (value.length === 3 ? value : prev));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onChangeSearch = (e: any) => {
    let value = e.target.value;
    value = value.length > 3 ? value.slice(0, 3) : value;
    setSearchedCurr(value);
  };

  return (
    <div>
      <header className="flex justify-center">
        <h1 className="uppercase mt-10 text-xl border-b-2 border-black border-solid pb-2 xl:px-96 md:px-48 ">
          exchange rates api
        </h1>
      </header>
      <div className="flex mt-1">
        <form className="ml-8" onSubmit={handleOnSubmit}>
          <label>
            Base currency:
            <input
              className="bg-slate-300 rounded-lg pl-3 ml-1 text-sm w-14 outline-none uppercase"
              onChange={onChange}
              type="text"
              name="currency"
            />
          </label>
        </form>
        <form className="ml-8" onSubmit={handleOnSubmit}>
          <label>
            Search currency:
            <input
              className="bg-slate-300 rounded-lg pl-3 ml-1 text-sm w-14 outline-none uppercase"
              onChange={onChangeSearch}
              type="text"
              name="search"
            />
          </label>
        </form>
      </div>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="mx-auto order-last md:order-first w-[450px] sm:w-[600px] md:w-[250px] md:mr-2 lg:w-[600px] xl:w-[720px] xl:ml-4">
          <CountryPicker
            baseCurr={baseCurr}
            rates={latestRates}
            setId={setId}
            searchedCurr={searchedCurr}
          />
        </div>
        <div className="mx-auto">
          {latestRates && (
            <Graph
              graph={graph}
              baseCurr={baseCurr}
              wanted={id}
              big={true}
              setAddFavCurr={setAddFavCurr}
            />
          )}
          {latestRates && (
            <Favorites
              baseCurr={baseCurr}
              rates={latestRates}
              graph={graph}
              setId={setId}
              addFavCurr={addFavCurr}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
