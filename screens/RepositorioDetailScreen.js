import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function RepositorioDetailScreen({ route, navigation }) {
  const { item } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
  }, []);

  const navigateToSection = (section) => {
    console.log(`Navigating to ${section}`);
    navigation.navigate(section, { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.repoName}>{item.nadescription}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToSection("IssuesAndTasks")}
      >
        <Text style={styles.buttonText}>Issues and Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToSection("Documentacao")}
      >
        <Text style={styles.buttonText}>Documentação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToSection("Anotacoes")}
      >
        <Text style={styles.buttonText}>Anotações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  repoName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3182ce",
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default RepositorioDetailScreen;
