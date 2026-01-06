import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";

import { deleteItem, fetchedItemDetails } from "../util/database";
import { useClipboardPassword } from "../hooks/useClipboardPassword";
import { decryptPassword } from "../util/crypto";
import IconButton from "../components/UI/IconButton";
import Icon from "../components/UI/Icon";
import Colors from "../constants/Colors";

function ItemDetails({ route, navigation }) {
  const [fetchedItem, setFetchedItem] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState("••••••••");

  const { copyPassword } = useClipboardPassword();
  const selectedItemId = route.params.itemId;

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

  useEffect(() => {
    if (!showPassword || !fetchedItem) {
      setVisiblePassword("••••••••");
      return;
    }
    try {
      const decrypted = decryptPassword(fetchedItem.encryptedPassword);
      setVisiblePassword(decrypted);
    } catch {
      Alert.alert("Vault locked", "Unlock again to view password");
      navigation.goBack();
    }
  }, [showPassword, fetchedItem]);

  function onTogglePasswordHandler() {
    setShowPassword((prev) => !prev);
    setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  }

  function onSelectDeleteHandler() {
    Alert.alert(
      "Delete Password",
      "Are you sure you want to delete this item ?",
      [
        { text: "Cancel", style: "Cancel" },
        {
          text: "Delete",
          style: "Destructive",
          onPress: async () => {
            await deleteItem(selectedItemId);
            navigation.goBack();
          },
        },
      ]
    );
  }

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
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}>{visiblePassword}</Text>
            <View style={styles.iconContainer}>
              <Icon
                icon={showPassword ? "eye-off" : "eye"}
                size={20}
                color={Colors.Primary}
                onPress={onTogglePasswordHandler}
              />
              <Icon
                icon="copy-outline"
                size={20}
                color={Colors.Primary}
                onPress={() =>
                  copyPassword(visiblePassword, {
                    isVisible: showPassword,
                  })
                }
              />
            </View>
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  passwordText: {
    flex: 1,
    color: Colors.Primary,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  passwordContainer: {
    backgroundColor: Colors.Secondary,
    borderColor: Colors.Light,
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: Colors.Primary,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
