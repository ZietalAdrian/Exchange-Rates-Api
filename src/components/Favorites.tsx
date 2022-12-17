import { FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import FavoritesCurrency from "./FavoritesCurrency";

interface FavoritesProps {
  favoritesArray?: currObj[];
  grafItem?: currObj;
  addFavCurr: boolean;
  setAddFavCurr: (addFavCurr: boolean) => void;
  setInitialArray: (initialArray: [string, string][]) => void;
  setItem: (item: currObj) => void;
}
type currObj = {
  name: string;
  base: string;
  value: number;
  diffAmount?: string;
  diffPercentage?: string;
  timeseries: number[];
  dates: string[];
};

const Favorites: FC<FavoritesProps> = ({
  favoritesArray,
  grafItem,
  setItem,
  addFavCurr,
  setAddFavCurr,
  setInitialArray,
}) => {
  const [arrayFavoritesCurrency, setArrayFavoritesCurrency] = useState<
    currObj[]
  >([]);
  const [initialFavorites, setInitialFavorites] = useState<[string, string][]>([
    ["JPY", "USD"],
    ["EUR", "PLN"],
    ["USD", "GBP"],
  ]);
  const [middleman, setMiddleman] = useState<currObj>();
  const [trash, setTrash] = useState(false);

  useEffect(() => {
    middleman && setItem(middleman);
  }, [middleman]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FavCurr",
      drop: (item: currObj) => {
        console.log("drag", item.base, item.name);
        removeFavCurr(item.base, item.name);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [arrayFavoritesCurrency, setArrayFavoritesCurrency]
  );

  const removeFavCurr = (base: string, name: string) => {
    if (arrayFavoritesCurrency && arrayFavoritesCurrency.length > 0) {
      const arrayCopy = [...arrayFavoritesCurrency];
      const newArray = arrayCopy.filter((elem) => {
        return !(elem.base === base && elem.name === name);
      });
      setTrash(false);
      setArrayFavoritesCurrency(newArray);
      removeInitFav(base, name);
    }
  };

  const removeInitFav = (base: string, name: string) => {
    const arrayCopy = [...initialFavorites];
    const newArray = arrayCopy.filter((elem) => {
      return elem[0] !== base && elem[1] !== name;
    });
    setInitialFavorites(newArray);
  };

  const addToFavArray = (item: currObj) => {
    if (addFavCurr) {
      if (arrayFavoritesCurrency.length > 0) {
        if (
          !arrayFavoritesCurrency.some((item: currObj) => {
            if (grafItem)
              return item.base === grafItem.base && item.name === grafItem.name;
          })
        ) {
          setArrayFavoritesCurrency((prev: currObj[]) => [...prev, item]);
        }
      } else {
        setArrayFavoritesCurrency([item]);
      }
      if (initialFavorites && initialFavorites.length > 0) {
        setInitialFavorites((prev: [string, string][]) => [
          ...prev,
          [item.base, item.name],
        ]);
      } else {
        setInitialFavorites([[item.base, item.name]]);
      }
      setAddFavCurr(false);
    }
  };

  useEffect(() => {
    setInitialArray(initialFavorites);
  }, []);

  useEffect(() => {
    favoritesArray && setArrayFavoritesCurrency(favoritesArray);
  }, [favoritesArray]);

  useEffect(() => {
    grafItem && addToFavArray(grafItem);
  }, [grafItem]);

  return (
    <>
      <div className="relative left-1 sm:left-0">
        <span>Favorites</span>
      </div>
      <section className="relative border-2 border-black h-[246px] lg:w-[600px] xl:w-[660px]">
        {arrayFavoritesCurrency && arrayFavoritesCurrency.length > 0 && (
          <div className="grid content-start place-items-center gap-2 pl-5 py-3 px-5  overflow-scroll h-full w-[450px] sm:w-[600px] sm:px-3 sm:grid-cols-2 md:w-[500px] md:grid-cols-1 lg:grid-cols-2 lg:w-[600px] xl:w-[660px]">
            {arrayFavoritesCurrency.map((item: currObj) => {
              return (
                <FavoritesCurrency
                  key={item.base + item.name}
                  obj={item}
                  setTrash={setTrash}
                  setMiddleman={setMiddleman}
                />
              );
            })}
          </div>
        )}
        {trash && (
          <div
            ref={drop}
            className=" absolute left-0 bottom-0 w-full h-10 bg-red-600/50 z-40 overflow-hidden"
          >
            <div className="z-50 my-[2px] h-10 bg-top bg-[length:40px_36px] bg-no-repeat bg-[url('/src/img/trash.png')] opacity-100"></div>
          </div>
        )}
      </section>
    </>
  );
};

export default Favorites;
