import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Text } from "react-native";
import Item from "./Item";

function ItemsList({ items }) {
  const navigation = useNavigation();

  function selectItemHandler(id) {
    navigation.navigate("ItemDetails", {
      itemId: id,
    });
  }

  if (!items || items.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Your vault is empty.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Item item={item} onSelect={selectItemHandler} />
      )}
    />
  );
}

export default ItemsList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {},
  fallbackText: {},
});
