import { Currency } from "./Currency";
import { FC } from "react";

type FavoritesProps = {
  favoritesCurrency: any[];
  baseCurrency: any;
  removeCurrency: (n: any) => void;
};

const Favorites: FC<FavoritesProps> = ({
  favoritesCurrency,
  baseCurrency,
  removeCurrency,
}) => {
  return (
    <section className="grid grid-cols-4 content-start gap-3 px-6 py-3 w-[620px] h-[250px] mt-5 border-2 border-black overflow-scroll">
      {favoritesCurrency &&
        favoritesCurrency.map(([name, value], index) => {
          return (
            <Currency
              key={index}
              name={name}
              value={value}
              base={baseCurrency}
              favorite={true}
              removeCurrency={removeCurrency}
            />
          );
        })}
    </section>
  );
};

export default Favorites;
