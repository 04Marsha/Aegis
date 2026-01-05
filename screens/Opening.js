import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { StyleSheet, Image, Animated } from "react-native";

function Opening() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace("AllItems");
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <Image
        source={require("../assets/aegis-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

export default Opening;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 130,
    width: 130,
  },
});
