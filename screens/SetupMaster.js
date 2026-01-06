import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { saveMasterPassword } from "../util/auth";
import { getPasswordStrength } from "../util/passwordStrength";
import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import PasswordStrengthColors from "../constants/PasswordStrengthColors";

function SetupMaster({ onDone }) {
  const [password, setPassword] = useState("");
  const strength = getPasswordStrength(password);
  const isStrongEnough = strength.score >= 3;

  async function setupHandler() {
    if (password.length < 6) {
      Alert.alert(
        "Password should be 6 letters long.",
        "Please try again later!"
      );
      return;
    }
    await saveMasterPassword(password);
    onDone();
  }

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <Text style={styles.title}>Create Master Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {password.length > 0 && (
        <View style={styles.strengthContainer}>
          <View style={styles.meterContainer}>
            <View
              style={[
                styles.meterFill,
                {
                  width: `${(strength.score / 5) * 100}%`,
                  backgroundColor: strength.color,
                },
              ]}
            ></View>
          </View>
          <Text style={[styles.strengthText, { color: strength.color }]}>
            {strength.label}
          </Text>
        </View>
      )}
      <IconButton
        icon="shield-checkmark"
        size={22}
        color={Colors.Primary}
        bgColor={Colors.Success}
        disabled={!isStrongEnough}
        onPress={setupHandler}
      >
        Save
      </IconButton>
    </View>
  );
}

export default SetupMaster;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  passwordContainer: {
    marginBottom: 20,
  },
  title: {
    color: Colors.Tint,
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: Colors.Secondary,
    color: Colors.Primary,
    borderRadius: 12,
    padding: 12,
    fontSize: 20,
  },
  meterContainer: {
    height: 8,
    width: "100%",
    backgroundColor: PasswordStrengthColors.Gray,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  strengthContainer: {
    marginBottom: 30,
  },
  meterFill: {
    height: "100%",
    borderRadius: 10,
  },
  strengthText: {
    textAlign: "center",
    letterSpacing: 0.4,
  },
});
