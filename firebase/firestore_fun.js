import { auth, db } from "./Config";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
async function getInfo(userId) {
  const userRef = doc(db, "users", userId);

  // Get user document
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.log("User not found");
    return null;
  }
  const user = userSnap.data();

  const todosRef = collection(userRef, "todos");

  const todosQuerySnapshot = await getDocs(todosRef);
  const todos = [];
  todosQuerySnapshot.forEach((doc) => {
    todos.push(doc.data());
  });

//   const messagesRef = collection(userRef, "messages");

//   const messagesQuerySnapshot = await getDocs(messagesRef);
//   const messages = [];
//   messagesQuerySnapshot.forEach((doc) => {
//     messages.push(doc.data());
//   });

  return {
    user: user,
    todos: todos,
    // messages: messages,
  };
}
async function addMes(uId,data){
    const userRef = doc(db, "messages", uId);

    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.log("User not found");
      return null;
    }
  
    const MessageRef = collection(userRef, "userMessages");
  
    await addDoc(MessageRef, {
      todo: data.title,
      date: data.date,
      uId: data.uId,
    });
  
    console.log("Todo added successfully");
}
async function getMes () {
  try {
    const messagesRef = collection(db, "messages",);
    const snapshot = await getDocs(messagesRef);
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(messages);
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    return [];
  }
};

async function deletetodo(uId, key) {
   try {
     const userRef = doc(db, "users", uId);
     const todosRef = collection(userRef, "todos");
     const q = query(todosRef, where("date", "==", key));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       deleteDoc(doc.ref);
     });
   } catch (error) {
    console.error(error)
   }
  }
  
async function addTodo(userId, data) {
  const userRef = doc(db, "users", userId);

  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.log("User not found");
    return null;
  }

  const todosRef = collection(userRef, "todos");

  await addDoc(todosRef, {
    todo: data.todo,
    date: data.date,
    done: data.done,
  });

  console.log("Todo added successfully");
}
export { getInfo, addMes, addTodo, deletetodo,getMes };
