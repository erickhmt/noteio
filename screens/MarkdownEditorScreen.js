import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";
import Markdown from "react-native-marked";

const MarkdownEditorScreen = () => {
  const [markdownText, setMarkdownText] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/erickhmt/controle-horas/master/README.md",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as JSON
        return response.text();
      })
      .then((data) => {
        setMarkdownText(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleTextChange = (text) => {
    setMarkdownText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        placeholder="Write your Markdown here..."
        onChangeText={handleTextChange}
        value={markdownText}
      />
      <ScrollView style={styles.previewContainer}>
        <Text style={styles.preview}>
          <Markdown
            value={markdownText}
            flatListProps={{
              initialNumToRender: 8,
            }}
          />
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  editor: {
    flex: 1, // Takes up all available vertical space
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
  },
  previewContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  preview: {
    flex: 1,
  },
});

export default MarkdownEditorScreen;
