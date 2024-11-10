import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = await AsyncStorage.getItem("apiKey");
        if (!apiKey) {
          router.replace("/");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error retrieving apiKey:", error);
      }
    };

    checkApiKey();
  }, []);

  return isAuthenticated;
}
