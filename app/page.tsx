import { AtlasFooter } from "@/components/atlas-footer";
import { RestaurantExplorer } from "@/components/restaurant-explorer";
import { dataSourceLabel, restaurants, TOTAL_EPISODES_AIRED } from "@/data/restaurants";

export default function Home() {
  const openCount = restaurants.filter((r) => r.status !== "permanently_closed").length;

  return (
    <>
      <h1 className="sr-only">
        Carte Cauchemar en cuisine — Tous les restaurants de Philippe Etchebest
      </h1>
      <RestaurantExplorer
        dataSourceLabel={dataSourceLabel}
        restaurants={restaurants}
      />
      <AtlasFooter
        totalEpisodes={TOTAL_EPISODES_AIRED}
        openCount={openCount}
        permanentlyClosedCount={restaurants.length - openCount}
      />
    </>
  );
}
