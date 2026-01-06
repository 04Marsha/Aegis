import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

function Icon({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default Icon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 15,
  },
  text: {
    color: Colors.Tint,
    fontSize: 20,
    fontWeight: 500,
  },
});
