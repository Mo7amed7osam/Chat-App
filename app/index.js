import { router } from "expo-router";
import { useState, useEffect } from "react";
import {Todos} from "./todos/[id]";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Chat from "./chat/[id]";

export default function Page() {
  const [isLogin, setIsLogin] = useState("");

  // useEffect(()=>{
  //  const fetchstate=async()=>{
  //  const cd =await AsyncStorage.getItem("state");
  //  setIsLogin(JSON.parse(cd));
  //  console.log(isLogin);
  //   }
  //  fetchstate();
  // },[]);
  
  // if(isLogin.login){
  //   return (
  //     <View style={styles.container}>
  //       <Todos />
  //     </View>
  //   );
  // }else{
  return (
    <View style={styles.container}>
      
      <Login  />
    </View>
  );
}

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
 
});
