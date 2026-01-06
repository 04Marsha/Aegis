import { StyleSheet, Pressable, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

function OutlinedIconButton({ icon, size, color, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={[styles.container, { borderColor: color }]}>
        <Ionicons name={icon} size={size} color={color} />
        <Text style={[styles.text, { color }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default OutlinedIconButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressed: { opacity: 1 },
  container: {
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: 1.3,
    marginLeft: 10,
  },
});
