import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "./hooks/useColorScheme";
import { View, Platform } from "react-native";

//navigation
import { Stack, useRouter } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

//components
import { Loading } from "./components/Loading";

//apis and services
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent splash screen from hiding before app initialization
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

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

  // Firebase authentication logic for native platforms
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

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
        <Loading />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={({ route }) => {
            const routeName = route.name.split("/").pop() ?? "Screen";
            const formattedName =
              routeName.charAt(0).toUpperCase() + routeName.slice(1);
            return {
              title: formattedName,
            };
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
          <Stack.Screen name="screens/about" options={{ title: "About" }} />
          <Stack.Screen name="screens/review/[reviewId]" options={{ title: "Review" }} />
          <Stack.Screen name="screens/product/[productId]" options={{ title: "Product" }} />
          <Stack.Screen name="screens/upload" options={{ title: "Add Review" }} />
          <Stack.Screen name="screens/profile/[userId]" options={{ title: "User Profile" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
