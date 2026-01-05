import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { fetchedItemDetails } from "../util/database";
import Colors from "../constants/Colors";
import IconButton from "../components/UI/IconButton";

function ItemDetails({ route, navigation }) {
  const [fetchedItem, setFetchedItem] = useState();

  const selectedItemId = route.params.itemId;

  function onSelectDeleteHandler() {
    console.log("delete");
  }

  useEffect(() => {
    async function loadItemData() {
      const item = await fetchedItemDetails(selectedItemId);
      setFetchedItem(item);
      navigation.setOptions({
        title: item.title,
      });
    }
    loadItemData();
  }, [selectedItemId]);

  if (!fetchedItem) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Username</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{fetchedItem.username}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Password</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{fetchedItem.password}</Text>
          </View>
        </View>
      </View>
      <IconButton
        icon="close"
        size={24}
        color={Colors.Primary}
        bgColor={Colors.Danger}
        onPress={onSelectDeleteHandler}
      >
        Delete
      </IconButton>
    </ScrollView>
  );
}

export default ItemDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: Colors.Tint,
    fontSize: 20,
    fontWeight: 600,
  },
  container: {
    marginVertical: 40,
  },
  itemContainer: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    gap: 10,
  },
  title: {
    color: Colors.Tint,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  textContainer: {
    backgroundColor: Colors.Secondary,
    borderColor: Colors.Light,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 15,
  },
  text: {
    color: Colors.Primary,
    fontSize: 20,
    fontWeight: "bold",
  },
});
