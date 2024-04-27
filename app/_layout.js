import { Stack, router } from "expo-router";
import { Button,Pressable,Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function RoutLayout (){
    return(
        <Stack>
            <Stack.Screen  name="index" options={{
                headerTitle:"Login",
            }}/>
            <Stack.Screen name="users/[id]"
            options={{
                headerTitle:"users",
            }} />
            <Stack.Screen name="todos/[id]" 
            options={{
                headerTitle:"User Page",
                headerRight: () => (
                   <Pressable onPress={()=> router.push(`chat/[id]`)}>
                    <Icon name='comment' size={25} color={'red'}/>
                   </Pressable>
                  ),
            }} />
            <Stack.Screen name="account/register/register"
            options={{
                headerTitle:"Register",
            }} />
            <Stack.Screen name="chat/[id]" 
            options={{
                headerTitle:"Chat page",
            }}
            />
             <Stack.Screen name="account/login/login"
            options={{
                headerTitle:"Login",
            }} />
        </Stack>
    )
}