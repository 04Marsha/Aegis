import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as ScreenCapture from "expo-screen-capture";

import Colors from "./constants/Colors";
import Opening from "./screens/Opening";
import AllItems from "./screens/AllItems";
import AddItem from "./screens/AddItem";
import ItemDetails from "./screens/ItemDetails";
import { clearVault, init } from "./util/database";
import Icon from "./components/UI/Icon";
import Unlock from "./screens/Unlock";
import { hasMasterPassword, resetMasterPassword } from "./util/auth";
import SetupMaster from "./screens/SetupMaster";
import { Alert, AppState } from "react-native";
import { clearEncryptionKey } from "./util/keyStore";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);

  useEffect(() => {
    async function prepare() {
      await init();
      const exists = await hasMasterPassword();

      if (!exists) {
        setNeedsSetup(true);
      } else {
        setNeedsUnlock(true);
      }

      setDbInitialised(true);
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      ScreenCapture.preventScreenCaptureAsync();
    } else {
      ScreenCapture.allowScreenCaptureAsync();
    }
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, [isUnlocked]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active" && isUnlocked) {
        console.log("AUTO-LOCK : App moved to background");

        clearEncryptionKey();
        setIsUnlocked(false);
        setNeedsUnlock(true);
      }
    });
    return () => subscription.remove();
  }, [isUnlocked]);

  if (!dbInitialised) {
    return null;
  }

  if (needsSetup)
    return (
      <SetupMaster
        onDone={() => {
          setNeedsSetup(false);
          setNeedsUnlock(true);
        }}
      />
    );

  function confirmResetVault() {
    Alert.alert(
      "Reset Master Password?",
      "This will permanently delete all saved passwords in your vault.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", style: "destructive", onPress: confirmFinalReset },
      ]
    );
  }

  async function confirmFinalReset() {
    Alert.alert(
      "Final Warning",
      "This action CANNOT be undone.\n\nAll passwords will be erased forever.",
      [
        { text: "Go Back", style: "cancel" },
        {
          text: "Yes, Delete Everything",
          style: "destructive",
          onPress: async () => {
            await resetMasterPassword();
            await clearVault();
            clearEncryptionKey();

            setNeedsUnlock(false);
            setNeedsSetup(true);
            setIsUnlocked(false);
          },
        },
      ]
    );
  }

  if (needsUnlock) {
    return (
      <Unlock
        onUnlock={() => {
          setNeedsUnlock(false);
          setIsUnlocked(true);
        }}
        onReset={confirmResetVault}
      />
    );
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
