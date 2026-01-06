import * as SQLite from "expo-sqlite";
import { Item } from "../models/item";
import { encryptPassword } from "./crypto";

let database;

async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("items.db");
  }
  return database;
}

export async function init() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

export async function insertItem(item) {
  const db = await getDatabase();
  const encryptedPassword = encryptPassword(item.password);
  const result = await db.runAsync(
    `INSERT INTO items (title, username, password)
         VALUES (?, ?, ?)`,
    [item.title, item.username, encryptedPassword]
  );
  return result;
}

// export async function insertItem(item) {
//   console.log("INSERT START");

//   try {
//     const db = await getDatabase();

//     console.log("ABOUT TO ENCRYPT");
//     const encryptedPassword = encryptPassword(item.password);
//     console.log("ENCRYPTED:", encryptedPassword);

//     const result = await db.runAsync(
//       `INSERT INTO items (title, username, password)
//        VALUES (?, ?, ?)`,
//       [item.title, item.username, encryptedPassword]
//     );

//     console.log("INSERT DONE");
//     return result;
//   } catch (err) {
//     console.log("INSERT ERROR:", err.message);
//     throw err;
//   }
// }

export async function fetchItems() {
  const db = await getDatabase();
  const result = await db.getAllAsync("SELECT * FROM items");

  return result.map((dp) => new Item(dp.id, dp.title, dp.username, null));
}

export async function fetchedItemDetails(id) {
  const db = await getDatabase();
  const result = await db.getFirstAsync("SELECT * FROM items WHERE id = ?", [
    id,
  ]);

  if (!result) {
    return null;
  }

  return {
    id: result.id,
    title: result.title,
    username: result.username,
    encryptedPassword: result.password,
  };
}

export async function deleteItem(id) {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM items WHERE id = ?`, [id]);
}

export async function clearVault() {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM items");
}
