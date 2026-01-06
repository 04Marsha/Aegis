import { StyleSheet, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

function IconButton({
  icon,
  size,
  color,
  bgColor,
  onPress,
  disabled = false,
  children,
}) {
  return (
    <Pressable
      onPress={disabled ? null : onPress}
      android_ripple={disabled ? null : { color: "rgba(255,255,255,0.2)" }}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: bgColor },
          disabled && styles.disabled,
        ]}
      >
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
  disabled: {
    opacity: 0.6,
    backgroundColor: Colors.Diabled,
  },
  container: {
    justifyContent: "center",
    flexDirection: "row",
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
