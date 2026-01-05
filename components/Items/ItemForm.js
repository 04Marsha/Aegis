import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import { useState } from "react";
import IconButton from "../UI/IconButton";
import { Item } from "../../models/item";

function ItemForm({ onCreateItem }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function changeUsernameHandler(enteredName) {
    setEnteredUsername(enteredName);
  }

  function changePasswordHandler(enteredPass) {
    setEnteredPassword(enteredPass);
  }

  function saveItemHandler() {
    const itemData = new Item(null, enteredTitle, enteredUsername, enteredPassword);
    console.log(itemData);
    onCreateItem(itemData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHandler}
        />
      </View>
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={enteredUsername}
          onChangeText={changeUsernameHandler}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={enteredPassword}
          onChangeText={changePasswordHandler}
          secureTextEntry
        />
      </View>
      <IconButton
        icon="checkmark"
        size={25}
        color={Colors.Primary}
        bgColor={Colors.Success}
        onPress={saveItemHandler}
      >
        Save
      </IconButton>
    </ScrollView>
  );
}

export default ItemForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.Tint,
    marginBottom: 15,
  },
  input: {
    marginBottom: 35,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.Primary,
    fontSize: 16,
    borderRadius: 20,
    borderBottomColor: Colors.Light,
    borderBottomWidth: 1.5,
    backgroundColor: Colors.Secondary,
  },
});
