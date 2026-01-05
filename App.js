import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
import Colors from "./constants/Colors";
import Opening from "./screens/Opening";
import AllItems from "./screens/AllItems";
import AddItem from "./screens/AddItem";
import ItemDetails from "./screens/ItemDetails";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import Icon from "./components/UI/Icon";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
        setDbInitialised(true);
      } catch (err) {
        console.log(err);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!dbInitialised) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.Tint },
            contentStyle: { backgroundColor: Colors.Primary },
          }}
        >
          <Stack.Screen
            name="Opening"
            component={Opening}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllItems"
            component={AllItems}
            options={({ navigation }) => ({
              title: "Your Vault",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "bold",
              },
              headerRight: ({ tintColor }) => (
                <Icon
                  icon="add-circle"
                  size={25}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddItem")}
                />
              ),
              headerLeft: ({ tintColor }) => (
                <Icon
                  icon="shield-checkmark-outline"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AllItems")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddItem"
            component={AddItem}
            options={{
              title: "Add an Item",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ItemDetails"
            component={ItemDetails}
            options={{
              title: "Loading Details...",
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "500",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
