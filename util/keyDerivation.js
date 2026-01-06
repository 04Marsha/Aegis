import * as Crypto from "expo-crypto";

export async function deriveKey(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password.trim()
  );
}
