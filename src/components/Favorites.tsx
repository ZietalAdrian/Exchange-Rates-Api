import { FC, useEffect, useState } from "react";

import useRateDifference from "../utils/useRateDifference";
import FavoritesCurrency from "./FavoritesCurrency";

interface FavoritesProps {
  formularz: string;
  rates: any; //komu to potrzebne ?
  graph: { [key: string]: { [key: string]: number } } | [];
  setId: (id: string) => void;
  addFavCurr?: string;
}
type currObj = {
  name: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
};

const Favorites: FC<FavoritesProps> = ({
  formularz,
  rates,
  graph,
  setId,
  addFavCurr,
}) => {
  const [arrayFavoritesCurrency, setArrayFavoritesCurrency] = useState<
    currObj[] | [] | any
  >([]);
  const [initialFavorites, setInitialFavorites] = useState(["PLN", "EUR"]);

  const { doPropertiesOnObject, policz } = useRateDifference(graph);

  const something = () => {
    let result: any[] = [];

    rates &&
      initialFavorites.forEach((curr) => {
        result.push(
          Object.entries(rates).find((rate) => {
            return rate[0] === curr;
          })
        );
      });

    const arr = doPropertiesOnObject(result);

    return arr;
  };

  useEffect(() => {
    setArrayFavoritesCurrency(policz(something()));
  }, [rates, initialFavorites]);

  useEffect(() => {
    addFavCurr &&
      addFavCurr.length !== 0 &&
      setInitialFavorites((prev) => [...prev, addFavCurr]);
  }, [addFavCurr]);

  return (
    <>
      <div className="relative left-1 sm:left-0">
        <span>Favorites</span>
      </div>
      <section className="grid content-start place-items-center gap-2 pl-5 py-3 px-5 border-2 border-black overflow-scroll h-[246px] w-[450px] sm:w-[600px] md:w-[500px] lg:w-[600px] xl:w-[660px] lg:grid-cols-2 ">
        {arrayFavoritesCurrency &&
          arrayFavoritesCurrency.map((item: any, index: number) => {
            const { name, value, diffAmount, diffPercentage } = item;
            return (
              <FavoritesCurrency
                key={index}
                name={name}
                value={value}
                base={formularz}
                graph={graph}
                diffAmount={diffAmount}
                diffPercentage={diffPercentage}
                setId={setId}
              />
            );
          })}
      </section>
    </>
  );
};

export default Favorites;
