let encryptionKey = null;

export function setEncryptionKey(key) {
  encryptionKey = key;
}

export function getEncryptionKey() {
  if (!encryptionKey) {
    throw new Error("Encryption Key not available!");
  }
  return encryptionKey;
}

export function clearEncryptionKey() {
  encryptionKey = null;
}
