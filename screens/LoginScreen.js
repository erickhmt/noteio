import { Ionicons } from "@expo/vector-icons";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useAuth } from "../context/auth";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync ] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
      scopes: [
        "identity",
        "user:email",
        "read:user",
        "user:follow",
        "repo",
        // "public_repo",
      ],
      redirectUri: makeRedirectUri({ scheme: "noteioapp" }),
    },
    discovery,
  );

  const auth = useAuth();

  React.useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    if (response?.type === "success") {
      const { code } = response.params;
      const { token_type, scope, access_token } =
        await createTokenWithCode(code);

      auth.signIn(access_token);

      // Just in case we don't have the token return early
      if (!access_token) return;

      const credential = GithubAuthProvider.credential(access_token);
      // Finally we use that credential to register the user in Firebase
      const data = await signInWithCredential(FIREBASE_AUTH, credential);
      // console.log("login data: ", data);
    }
  }

  async function createTokenWithCode(code) {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}` +
      `&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}` +
      `&code=${code}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // The response should come with: { token_type, scope, access_token }
    return res.json();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NoteIO</Text>
      <Text style={styles.welcomeText}>
        <Text style={styles.boldText}>Bem-vindo de Volta!</Text> Acesse sua
        conta para continuar a usar o NoteIO.
      </Text>
      <TouchableOpacity
        style={styles.githubButton}
        onPress={() => {
          promptAsync({ windowName: "NoteIO" });
        }}
      >
        <Ionicons name="logo-github" color="white" size={24} />
        <Text style={styles.githubButtonText}>Conecte-se com o GitHub</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#4a5568",
    textAlign: "center",
    marginBottom: 20,
    padding: 20,
  },
  githubButton: {
    backgroundColor: "#333", // Background color for GitHub button
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 4,
  },
  githubButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    marginRight: 5,
    color: "#4a5568",
  },
  signUpLink: {
    color: "#3182ce",
  },
});

export default LoginScreen;
