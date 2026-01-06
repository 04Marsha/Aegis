import { insertItem } from "../util/database";
import ItemForm from "../components/Items/ItemForm";

function AddItem({ navigation }) {
  async function createItemHandler(item) {
    await insertItem(item);
    navigation.goBack();
  }
  return <ItemForm onCreateItem={createItemHandler} />;
}

export default AddItem;
