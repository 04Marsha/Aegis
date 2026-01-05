import ItemsList from "../components/Items/ItemsList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchItems } from "../util/database";

function AllItems({ route }) {
  const [loadedItems, setLoadedItems] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadItems() {
      const items = await fetchItems();
      setLoadedItems(items);
    }

    if (isFocused) loadItems();
  }, [isFocused]);

  return <ItemsList items={loadedItems} />;
}

export default AllItems;
