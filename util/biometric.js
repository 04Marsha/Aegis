import * as LocalAuthentication from "expo-local-authentication";

export async function isBiometricAvailable() {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  return compatible && enrolled;
}

export async function authenticateBiometric() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock Vault",
    fallbackLabel: "Use Master Password",
    disableDeviceFallback: false,
  });
  return result.success;
}
