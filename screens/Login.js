import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { login, resetPass } from "../firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
   
    try {
        const credentials = await login(email, password);
        console.log(credentials);
        router.navigate(`/todos/${credentials.user.uid}`);
       await AsyncStorage.setItem('uid',credentials.user.uid)
      } catch (error) {
        console.log('error', error);
        setError(error.message); 
      }
  };

  const handelForgotPass=async ()=>{
    try{
      await resetPass(email);
      alert("Please check your email to reset your password");
    }catch(error){
      console.log('error', error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Pressable onPress={()=>router.replace("/account/register/register")}>
        <Text style={{ marginTop: 10 }}>Register</Text>
      </Pressable>
      <Pressable onPress={handelForgotPass}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Text>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
  },
});

export default Login;
