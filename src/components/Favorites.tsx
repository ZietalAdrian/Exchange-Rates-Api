import { FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import useRateDifference from "../utils/useRateDifference";
import FavoritesCurrency from "./FavoritesCurrency";

interface FavoritesProps {
  baseCurr: string;
  rates: { [key: string]: number };
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
  baseCurr,
  rates,
  graph,
  setId,
  addFavCurr,
}) => {
  const [arrayFavoritesCurrency, setArrayFavoritesCurrency] = useState<
    currObj[] | [] | any
  >([]);
  const [initialFavorites, setInitialFavorites] = useState([
    "PLN",
    "EUR",
    "JPY",
  ]);

  const [trash, setTrash] = useState(false);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FavCurr",
    drop: (item: any) => {
      removeFavCurr(item.id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }),[arrayFavoritesCurrency]);

  const removeFavCurr = (id: string) => {
    if (arrayFavoritesCurrency && arrayFavoritesCurrency.length>0) {
      const arrayCopy = [...arrayFavoritesCurrency]
      const newArray = arrayCopy.filter((elem) => {
       return elem.name !== id
      });
      setArrayFavoritesCurrency(newArray);
      removeInitFav(id)
    }
  };

  const removeInitFav = (id:string) => {
    const arrayCopy = [...initialFavorites]
    const newArray = arrayCopy.filter((elem) => {
     return elem !== id
    });
    setInitialFavorites(newArray);
  }

  const { doPropertiesOnObject, makeObject } = useRateDifference(graph);
  
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
    setArrayFavoritesCurrency(makeObject(something()));
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
      <section className="grid relative content-start place-items-center gap-2 pl-5 py-3 px-5 border-2 border-black overflow-scroll h-[246px] w-[450px] sm:w-[600px] sm:px-3 sm:grid-cols-2 md:w-[500px] md:grid-cols-1 lg:grid-cols-2 lg:w-[600px] xl:w-[660px]">
        {arrayFavoritesCurrency &&
          arrayFavoritesCurrency.map((item: any, index: number) => {
            const { name, value, diffAmount, diffPercentage } = item;
            return (
              <FavoritesCurrency
                key={index}
                name={name}
                value={value}
                baseCurr={baseCurr}
                graph={graph}
                diffAmount={diffAmount}
                diffPercentage={diffPercentage}
                setId={setId}
                setTrash={setTrash}
              />
            );
          })}
        {trash && (
          <div
            ref={drop}
            className="absolute left-0 bottom-0 w-full h-10 bg-red-600/50 z-40 overflow-hidden"
          >
            <div className="z-50 my-[2px] h-10 bg-top bg-[length:40px_36px] bg-no-repeat bg-[url('/src/img/trash.png')] opacity-100"></div>
          </div>
        )}
      </section>
    </>
  );
};

export default Favorites;
