import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { useEffect, useState } from "react";

import { verifyMasterPassword } from "../util/auth";
import { deriveKey } from "../util/keyDerivation";
import { setEncryptionKey } from "../util/keyStore";
import { authenticateBiometric, isBiometricAvailable } from "../util/biometric";
import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import Icon from "../components/UI/Icon";
import OutlinedIconButton from "../components/UI/OutlinedIconButton";

function Unlock({ onUnlock, onReset }) {
  const [password, setPassword] = useState("");
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const isPasswordEmpty = password.trim().length === 0;

  useEffect(() => {
    async function checkBio() {
      const availabe = await isBiometricAvailable();
      setBiometricAvailable(availabe);
    }
    checkBio();
  }, []);

  async function unlockHandler() {
    const ok = await verifyMasterPassword(password);
    if (!ok) {
      Alert.alert("Wrong password", "Please try again.");
      return;
    }
    const key = await deriveKey(password);
    setEncryptionKey(key);
    onUnlock();
  }

  async function biometricUnlockHandler() {
    const success = await authenticateBiometric();
    if (!success) return;

    const key = await deriveKey(password);
    setEncryptionKey(key);
    onUnlock();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Vault</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonsContainer}>
        <IconButton
          icon="lock-open"
          size={22}
          color={Colors.Primary}
          bgColor={Colors.Success}
          disabled={isPasswordEmpty}
          onPress={unlockHandler}
        >
          Unlock Vault
        </IconButton>
        <Icon
          icon="refresh"
          size={22}
          color={Colors.Danger}
          onPress={onReset}
        />
      </View>
      {biometricAvailable && (
        <OutlinedIconButton
          icon="finger-print"
          size={18}
          color={Colors.Tint}
          onPress={biometricUnlockHandler}
        >
          Unlock with biometrics
        </OutlinedIconButton>
      )}
    </View>
  );
}

export default Unlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    color: Colors.Tint,
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: Colors.Secondary,
    color: Colors.Primary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 60,
    fontSize: 20,
  },
});
