import { StyleSheet, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

function IconButton({ icon, size, color, bgColor, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={size} color={color} />
        <Text style={[styles.text, { color }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressed: { opacity: 1 },
  container: {
    justifyContent: "center",
    flexDirection: "row",
    borderColor: Colors.Light,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
