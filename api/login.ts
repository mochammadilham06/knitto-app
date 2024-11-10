import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface LoginPayload {
  username: string;
  password: string;
}
export const AuthService = () => {
  const router = useRouter();
  const login = async ({ username, password }: LoginPayload) => {
    const mockUsername = "admin";
    const mockPassword = "password";

    if (username === mockUsername && password === mockPassword) {
      await AsyncStorage.setItem("apiKey", process.env.BASEKEY || "");
      return true;
    } else {
      return false;
    }
  };
  const logout = async () => {
    AsyncStorage.removeItem("apiKey");
    router.push("/");
  };

  return {
    login,
    logout,
  };
};
