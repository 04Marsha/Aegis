import CryptoJS from "crypto-js";
import * as Crypto from "expo-crypto";
import { getEncryptionKey } from "./keyStore";

CryptoJS.lib.WordArray.random = function (nBytes) {
  const bytes = Crypto.getRandomBytes(nBytes);
  return CryptoJS.lib.WordArray.create(bytes);
}

export function encryptPassword(password) {
  const key = getEncryptionKey();
  return CryptoJS.AES.encrypt(password, key).toString();
}

export function decryptPassword(encodedText) {
  const key = getEncryptionKey();
  const bytes = CryptoJS.AES.decrypt(encodedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
