import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import { useAuth } from "../context/auth";

function ContaScreen({ navigation }) {
  const auth = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          //navigation.navigate("Login");
          auth.signOut();
        },
      },
    ]);
  };

  const githubUserInfo = {
    username: "erickhmt",
    name: auth.user?.displayName || "",
    avatarUrl:
      auth.user?.photoUrl || "https://avatars.githubusercontent.com/u/1?v=4",
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: githubUserInfo.avatarUrl }} style={styles.avatar} />

      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{githubUserInfo.username}</Text>
        <Text style={styles.name}>{githubUserInfo.name}</Text>
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#3182ce" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
  userInfoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#4a5568",
  },
  logoutButtonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: "white",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: "#3182ce",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default ContaScreen;
