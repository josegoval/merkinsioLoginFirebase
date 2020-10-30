// Firebase
import { db } from "./firebase-config";
// uuid
import { v4 } from "uuid";

export function deleteItem(id) {
  console.log(id);
}

export function modifyItem(item) {
  console.log(item);
}

export async function createItem(item) {
  console.log(item);
  try {
    await db.collection("employees").add({ id: v4().slice(0, 7), ...item });
    return true;
  } catch (error) {
    return false;
  }
}
