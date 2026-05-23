import { RestaurantExplorer } from "@/components/restaurant-explorer";
import { dataSourceLabel, restaurants } from "@/data/restaurants";

export default function Home() {
  return (
    <RestaurantExplorer
      dataSourceLabel={dataSourceLabel}
      restaurants={restaurants}
    />
  );
}
