import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CountryPicker from "./components/CountryPicker";
import Favorites from "./components/Favorites";
import Graph from "./components/Graph";
import useMakeObject from "./utils/useMakeObject";
import useLatestApi from "./Api/useLatestApi";

type currObj = {
  name: string;
  base: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
  timeseries: number[];
  dates: string[];
};

function App() {
  const [baseCurr, setBaseCurr] = useState<string>("EUR");
  const [searchedCurr, setSearchedCurr] = useState<string>();
  const [addFavCurr, setAddFavCurr] = useState<boolean>(false);
  const [item, setItem] = useState<currObj>();
  const [id, setId] = useState<string>("USD");
  const [grafItem, setGrafItem] = useState<currObj>();
  const [initialArray, setInitialArray] = useState<[string, string][]>();
  const [favoritesArray, setFavoritesArray] = useState<currObj[]>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.length > 3 ? value.slice(0, 3) : value;
    setBaseCurr((prev) => (value.length === 3 ? value : prev));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.length > 3 ? value.slice(0, 3) : value;
    setSearchedCurr(value);
  };

  const latestRates = useLatestApi(baseCurr);
  const { getObject } = useMakeObject();

  const getCurrency = async () => {
    await w8ForObject().then((res) => setGrafItem(res));
  };

  useEffect(() => {
    getCurrency();
  }, [id]);

  useEffect(() => {
    item && setGrafItem(item);
  }, [item]);

  const w8ForObject = (item?: [string, string]) => {
    let obj;
    if (item) {
      obj = getObject(item[0], item[1]);
    } else {
      obj = getObject(baseCurr, id);
    }
    return obj;
  };

  const getInitialObjects = async () => {
    const arr: currObj[] = [];
    if (initialArray && initialArray.length > 0) {
      for await (const item of initialArray) {
        const res = await w8ForObject(item);
        res && arr.push(res);
      }
    }
    return arr;
  };

  const showFavories = async () => {
    setFavoritesArray(await getInitialObjects());
  };

  useEffect(() => {
    showFavories();
  }, [initialArray]);

  return (
    <DndProvider backend={HTML5Backend}>
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
            {grafItem && (
              <Graph obj={grafItem} big={true} setAddFavCurr={setAddFavCurr} />
            )}
            {
              <Favorites
                favoritesArray={favoritesArray && favoritesArray}
                grafItem={addFavCurr ? grafItem : undefined}
                addFavCurr={addFavCurr}
                setAddFavCurr={setAddFavCurr}
                setInitialArray={setInitialArray}
                setItem={setItem}
              />
            }
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
