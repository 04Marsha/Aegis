import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

const MASTER_KEY = "MASTER_PASSWORD_HASH_123456";

function normalize(password) {
  return password.trim();
}

export async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    normalize(password)
  );
}

export async function saveMasterPassword(password) {
  const hash = await hashPassword(password);
  await SecureStore.setItemAsync(MASTER_KEY, hash);
}

export async function hasMasterPassword() {
  const stored = await SecureStore.getItemAsync(MASTER_KEY);
  return !!stored;
}

export async function verifyMasterPassword(password) {
  const storedHash = await SecureStore.getItemAsync(MASTER_KEY);
  if (!storedHash) return false;

  const inputHash = await hashPassword(password);
  return storedHash === inputHash;
}

export async function resetMasterPassword() {
  await SecureStore.deleteItemAsync(MASTER_KEY);
}
