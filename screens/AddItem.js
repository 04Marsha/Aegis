import { insertPlace } from "../util/database";
import ItemForm from "../components/Items/ItemForm";

function AddItem({ navigation }) {
  async function createItemHandler(item) {
    await insertPlace(item);
    navigation.navigate("AllItems");
  }
  return <ItemForm onCreateItem={createItemHandler} />;
}

export default AddItem;
