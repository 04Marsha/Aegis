import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

function VaultItem({ item, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, item.id)}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.Primary} />
      </View>
    </Pressable>
  );
}

export default VaultItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.Secondary,
    elevation: 2,
  },
  pressed: { opacity: 1 },
  container: {
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    color: Colors.Primary,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
