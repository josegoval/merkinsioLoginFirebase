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

export async function modifyItem(item) {
  const newItem = { name: item.name, lastName: item.lastName, wage: item.wage };
  console.log(item);
  try {
    await db.collection("employees").doc(item.id).set(newItem);
    return true;
  } catch (error) {
    return false;
  }
}

export async function createItem(item) {
  console.log(item);
  try {
    await db.collection("employees").add(item);
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

export async function snapshotDataFromEmployees(setData) {
  // snapshot
  const unsuscribe = await db.collection("employees").onSnapshot((snap) => {
    const newData = snap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setData(newData);
  });

  return unsuscribe;
}
