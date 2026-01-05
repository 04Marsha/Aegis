import * as SQLite from "expo-sqlite";
import { Item } from "../models/item";

let database;

export async function init() {
  const db = await SQLite.openDatabaseAsync("items.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
  database = db;
}

export async function insertPlace(item) {
  const result = await database.runAsync(
    `INSERT INTO items (title, username, password)
         VALUES (?, ?, ?)`,
    [item.title, item.username, item.password]
  );
  return result;
}

export async function fetchItems() {
  const result = await database.getAllAsync("SELECT * FROM items");

  const items = [];

  for (const dp of result) {
    items.push(new Item(dp.id, dp.title, dp.username, dp.password));
  }
  return items;
}

export async function fetchedItemDetails(id) {
  const result = await database.getFirstAsync(
    "SELECT * FROM items WHERE id = ?",
    [id]
  );

  if (!result) {
    return null;
  }

  const item = new Item(
    result.id,
    result.title,
    result.username,
    result.password
  );
  return item;
}

export async function deleteItem(id) {
  await database.runAsync(`DELETE FROM items WHERE id = ?`, [id]);
}
