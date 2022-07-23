import { getFirestore } from "firebase/firestore";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore();

const reminderCollectionRef = collection(db, "reminder");
class ReminderDataService {
  addReminder = (newReminder) => {
    return addDoc(reminderCollectionRef, newReminder);
  };

  updateReminder = (id, updatedReminder) => {
    const reminderDoc = doc(db, "reminder", id);
    return updateDoc(reminderDoc, updatedReminder);
  };

  deleteReminder = (id) => {
    const reminderDoc = doc(db, "reminder", id);
    return deleteDoc(reminderDoc);
  };

  getAllReminder = () => {
    return getDocs(reminderCollectionRef);
  };

  getReminder = (id) => {
    const reminderDoc = doc(db, "reminder", id);
    return getDoc(reminderDoc);
  };
}

export default new ReminderDataService();
