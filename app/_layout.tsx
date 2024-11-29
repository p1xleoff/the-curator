import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "./hooks/useColorScheme";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Platform } from "react-native";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

// Prevent splash screen from hiding before app initialization
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter(); // Hook to control navigation

  // Function to handle authentication state change
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Detect platform
  const isWeb = Platform.OS === "web";

  // Firebase authentication logic for native platforms
  useEffect(() => {
    if (!isWeb) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return () => subscriber(); // Unsubscribe on unmount
    } else {
      // Fallback for web: check localStorage or sessionStorage for authentication status
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // If a user exists in localStorage, set them as logged in
      }
      setInitializing(false); // Mark initialization as complete for web
    }
  }, [isWeb]);

  // Effect to handle navigation once initialization is complete
  useEffect(() => {
    if (loaded && !initializing) {
      SplashScreen.hideAsync();
      // Redirect based on user state (Firebase or localStorage for web)
      if (user) {
        router.replace("/(tabs)"); // If logged in, go to tabs
      } else {
        router.replace("/(auth)/login"); // If not logged in, go to login
      }
    }
  }, [loaded, initializing, user, router]); // Only run after state change

  if (!loaded || initializing) {
    // Splash screen or loading state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={({ route }) => {
          const routeName = route.name.split("/").pop() ?? "Screen";
          const formattedName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
          return {
            title: formattedName,
          };
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="screens/about" options={{ title: "About" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
