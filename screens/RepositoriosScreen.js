import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../context/auth";

function RepositoriosScreen({ navigation }) {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const fetchRepositories = async () => {
      const token = auth?.user?.accessToken || "";

      setLoading(true);
      fetch("https://api.github.com/users/erickhmt/repos")
        .then((response) => {
          // Check if the response status is OK (200)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Parse the response as JSON
          return response.json();
        })
        .then((data) => {
          console.log("******************* data: ", data);
          setRepositories(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    saveRepositories();
  }, [repositories]);

  const saveRepositories = async () => {
    try {
      await AsyncStorage.setItem("repositories", JSON.stringify(repositories));
    } catch (error) {
      console.error("Error saving repositories: ", error);
    }
  };

  const handleAddButtonPress = () => {
    Alert.alert("Erro", "Isso não foi implementado ainda", [
      {
        text: "Ok",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const getLanguageColor = (language) => {
    switch (language) {
      case "JavaScript":
        return "#f1e05a";
      case "Java":
        return "#b07219";
      case "Python":
        return "#3572A5";
      default:
        return "#ccc";
    }
  };

  const navigateToRepositorioDetail = (item) => {
    navigation.navigate("RepositorioDetail", { item });
  };

  const renderRepositoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRepositorioDetail(item)}>
      <View style={styles.repositoryItem}>
        <View style={styles.repositoryItemHeader}>
          <Text style={styles.repositoryName}>{item.name}</Text>
          <View style={styles.repositoryItemHeaderVisibility}>
            <Text style={{ color: "#FFF", fontSize: 10 }}>
              {item.visibility}
            </Text>
          </View>
        </View>
        <Text style={styles.repositoryDescription}>{item.description}</Text>
        <View />
        <View style={styles.repositoryItemBottom}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 10,
                backgroundColor: getLanguageColor(item.language),
                marginRight: 5,
              }}
            />
            <Text style={{ fontSize: 12, color: "#888" }}>{item.language}</Text>
          </View>
          <Text style={{ fontSize: 12, color: "#888" }}>
            Atualizado em 1 dia
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddButtonPress}
          >
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
          <FlatList
            data={repositories}
            style={{ width: "100%" }}
            renderItem={renderRepositoryItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  repositoryItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    width: "100%",
    elevation: 3, // Add elevation for Android shadow
    shadowColor: "#000000", // Add shadow for iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  repositoryItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  repositoryItemHeaderVisibility: {
    color: "#FFF",
    backgroundColor: "#888",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  repositoryDescription: {
    fontSize: 14,
    marginTop: 8,
  },
  repositoryItemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
});

export default RepositoriosScreen;
