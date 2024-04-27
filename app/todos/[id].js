import { useLocalSearchParams } from "expo-router";
import TodoItem from "./components/item";
import { useState, useEffect } from "react";
import { getInfo, updateInfo, addTodo, deletetodo } from "../../firebase/firestore_fun";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Todos() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        setIsLoading(true);
        const userinfo = await getInfo(id);
        if (userinfo) {
          setUser(userinfo.user);
          setTodos(userinfo.todos.sort((a, b) => b.date - a.date));
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchuser();
  }, [id]);

  const handleAddItem = async () => {
    if (textInputValue.trim() !== "") {
      const newTodo = {
        date:  Date.now().toString(),
        todo: textInputValue,
        done: false,
      };
      setTodos([...todos, newTodo].sort((a, b) => b.date - a.date));
      await addTodo(id, newTodo);
      setTextInputValue("");
    }
  };

  const handleDeleteItem = (key) => {
    console.log("Delete item called with key:", key);
    try {
      Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const filteredTodos = todos.filter((item) => item.date !== key);
            setTodos(filteredTodos);
            await deletetodo(id, key);
            Alert.alert("Success", "Item has been deleted");
          },
        },
      ]);
    } catch (error) {
      console.error("Error handling delete:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>User not found - ${id}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.userName}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <View style={styles.add}>
        <TextInput
          placeholder="Add Item"
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
        <Button title="Add" onPress={handleAddItem} color={"red"} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TodoItem todo={item.todo} />
            <Pressable onPress={() => handleDeleteItem(item.date)}>
              <Icon name="remove" size={24} color="red" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
  },
});
