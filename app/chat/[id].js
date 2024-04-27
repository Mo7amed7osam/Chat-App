// Chat.js

import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageItem from "./components/mesitem";
import RightMessageItem from "./components/right_mes_item";
import { getMes } from "../../firebase/firestore_fun";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../../firebase/Config";
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
  onSnapshot
} from "firebase/firestore";

export default function Chat() {
  const [uId, setUId] = useState();
  const [textInputValue, setTextInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setIsLoading(true);
        const temp_uid = await AsyncStorage.getItem("uid");
        setUId(temp_uid);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (uId) {
          const messagesRef = collection(db, "messages");
        
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
          const updatedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMessages(updatedMessages.sort((a, b) => b.date - a.date));
        });

        return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [uId]);

  const handleSendMes = async () => {
    if (textInputValue.trim() !== "") {
      try {
        // Create a reference to the 'messages' collection
        const messagesRef = collection(db, "messages");
        const newMes = {
          date: Date.now().toString(),
          message: textInputValue,
          userId: uId,
        };
        // Create a new message document with the current user's ID as the document ID
        const newMessageRef = await addDoc(messagesRef, newMes);
        setMessages([...messages, newMes].sort((a, b) => b.date - a.date));
        console.log("Message added successfully with ID: ", newMessageRef.id);
        setTextInputValue("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      // Remove the message document from Firestore
      await deleteDoc(doc(db, "messages", id));
  
      const updatedMessages = messages.filter((message) => message.id !== id);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          if (item.userId == uId) {
            return (
              <View style={[styles.todoContainer]}>
                <MessageItem mes={item.message} />

                <Pressable onPress={() => handleDeleteItem(item.id)}>
                  <Icon name="trash" size={24} color="red" />
                </Pressable>
              </View>
            );
          } else {
            return (
              <View style={[styles.todoContainer]}>
                <RightMessageItem mes={item.message} />
              </View>
            );
          }
        }}
        inverted
      />

      <View style={styles.add}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
        <Icon
          name="send"
          color={"lightblue"}
          onPress={handleSendMes}
          size={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 2,
  },
});
