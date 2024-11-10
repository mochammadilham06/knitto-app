import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthService } from "@/api/login";
import { LoadingModal } from "@/components";

export default function SignInPage() {
  //hooks
  const navigation = useNavigation();
  const router = useRouter();
  const { login } = AuthService();

  //state
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      const success = await login({ username, password });
      setLoading(false);
      if (success) {
        router.push("/home");
      } else {
        Alert.alert("Login Failed", "Incorrect username or password.");
      }
    }, 1500);
  };
  return (
    <SafeAreaView>
      <LoadingModal visible={isLoading} message="Signing in..." />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={styles.headerImage}
            alt="logo"
          />
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subTitle}>Get Acces to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.inputControl}
              placeholder="admin"
              placeholderTextColor={"#6b7280"}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="*****"
              placeholderTextColor={"#6b7280"}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading || !username || !password}
            >
              <View style={styles.btn}>
                <Text style={styles.btnTitle}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginVertical: 36,
    alignItems: "center",
  },

  headerImage: {
    width: 80,
    height: 80,
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1e1e1e",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  form: {
    width: "100%",
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  btn: {
    backgroundColor: "#61DBFB",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 19,
  },
  btnTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});
