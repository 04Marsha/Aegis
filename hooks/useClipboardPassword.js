import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";

export function useClipboardPassword() {
  async function copyPassword(password, options = {}) {
    const {
      requireVisible = true,
      isVisible = true,
      clearAfterMs = 15000,
    } = options;

    if (requireVisible && !isVisible) {
      Alert.alert("Reveal first", "Show password before copying.");
      return;
    }

    await Clipboard.setStringAsync(password);
    Alert.alert("Copied", "Password copied to Clipboard");

    if (clearAfterMs) {
      setTimeout(async () => {
        await Clipboard.setStringAsync("");
      }, clearAfterMs);
    }
  }
  return { copyPassword };
}
