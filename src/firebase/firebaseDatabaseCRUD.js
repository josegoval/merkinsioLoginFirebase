// Firebase
import { db } from "./firebase-config";

export async function deleteItem(id) {
  console.log(id);
  try {
    await db.collection("employees").doc(id).delete();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Modify the item in firebase database. If there's no image, it sets to null.
 * @param {object} item
 * @returns true if successful, false if not.
 */
export async function modifyItem(item) {
  const newItem = {
    name: item.name,
    lastName: item.lastName,
    wage: item.wage,
    img: item.img || null,
  };
  console.log(item);
  try {
    await db.collection("employees").doc(item.id).update(newItem);
    return true;
  } catch (error) {
    return false;
  }
}

export async function createItem(item) {
  const newItem = {
    name: item.name,
    lastName: item.lastName,
    wage: item.wage,
    img: item.img || null,
  };
  try {
    await db.collection("employees").add(newItem);
    return true;
  } catch (error) {
    return false;
  }
}

export async function fetchDataFromEmployees() {
  let fullData = [];
  // Query
  const querySnapshot = await db.collection("employees").get();
  // iterate query and adds it to fullData
  querySnapshot.forEach((doc) => {
    fullData.push({ id: doc.id, ...doc.data() });
  });

  return fullData;
}

export function snapshotDataFromEmployees(setData) {
  // snapshot
  const unsuscribe = db.collection("employees").onSnapshot((snap) => {
    console.log("cambio");
    const newData = snap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setData(newData);
  });

  return unsuscribe;
}
