# 🔐 Aegis - Secure Password Vault

Aegis is a **secure password vault** built with **React Native and Expo**, focused on strong local encryption, privacy, and modern mobile security practices.

The app stores all sensitive data locally, encrypts it using a master password-derived key, and provides advanced security features such as biometric unlock, clipboard protection, and screenshot prevention.

---

## 🎨 Branding & Design

Logo and app identity designed in-house

---

## ✨ Key Features

### 🔑 Master Password System
- One-time master password setup
- Master password is never stored in plain text
- Stored securely as a SHA-256 hash using expo-secure-store
- Required to unlock the vault

### 🔐 Strong Encryption
- Passwords are encrypted using AES encryption
- Encryption key is derived from the master password
- Key exists only in memory while unlocked
- Key is cleared on:
  - App background
  - App lock
  - Vault reset

### 🧬 Biometric Authentication
- Supports fingerprint / Face ID (device dependent)
- Biometric unlock is allowed only after master password is set
- Biometric authentication never bypasses encryption logic

### ⏱ Auto-Lock Security
- Vault automatically locks when:
  - App goes to background
  - App becomes inactive
- Encryption key is cleared instantly

### 📋 Clipboard Protection
- Passwords can be copied securely
- Clipboard auto-clears after a fixed timeout
- Prevents accidental leakage of sensitive data

### 📵 Screenshot & Screen Recording Protection
- Screenshots are disabled when vault is unlocked
- Automatically re-enabled when vault locks

### 🧹 Vault Reset (With Double Confirmation)
- Two-step confirmation before destructive actions
- Completely wipes:
  - Master password
  - Encryption key
  - All stored vault data

### 🧠 Password Strength Meter
- Real-time strength analysis during master password setup
- Evaluates:
  - Length
  - Uppercase
  - Lowercase
  - Numbers
  - Symbols
- Save button enabled only when password is strong enough

---

## 🗄️ Data Storage Strategy

### SQLite (Local Database)
- Stores:
  - Title
  - Username
  - Encrypted password
- Passwords are never decrypted at rest

### Secure Store
- Stores only:
  - Master password hash
- Uses OS-level secure storage

### Memory-Only Secrets
- Encryption key is:
  - Derived at unlock
  - Stored only in memory
  - Never persisted

---

## 🔁 Core App Flow

1. **First Launch**
   - User sets a master password
   - Password strength validated
   - Password hash stored securely

2. **Unlock**
   - User enters master password or uses biometrics
   - Encryption key is derived
   - Vault unlocks

3. **Vault Usage**
   - Add encrypted items
   - View usernames
   - Reveal password temporarily
   - Copy password safely

4. **Auto-Lock**
   - App background → vault locks
   - Key wiped from memory

5. **Reset Vault**
   - Double confirmation
   - All data erased permanently

---

## 📦 Dependencies Used

### Core
- expo
- react
- react-native

### Security & Storage
- expo-secure-store – Secure master password storage
- expo-crypto – Hashing & key derivation
- crypto-js – AES encryption
- expo-sqlite – Local database

### Device Security
- expo-local-authentication – Biometrics
- expo-screen-capture – Screenshot prevention
- expo-clipboard – Clipboard access

### Navigation
- @react-navigation/native
- @react-navigation/native-stack

---

## 🚀 Planned Enhancements

- Encrypted export / import
- Configurable auto-lock timer
- Password generator

---

## ⚠️ Security Disclaimer

Aegis is a personal security-focused application built for learning purposes.

---
