// import marked from "marked";
import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";

const MarkdownEditorScreen = () => {
  const [markdownText, setMarkdownText] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/erickhmt/controle-horas/master/README.md",
    )
      .then((response) => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as JSON
        return response.text();
      })
      .then((data) => {
        console.log("******************* data: ", data);
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
          {/* {marked(markdownText)} */}
          lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // Changed to column layout
  },
  editor: {
    flex: 1, // Takes up all available vertical space
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
  },
  previewContainer: {
    flex: 1, // Takes up all available vertical space
    padding: 16,
    backgroundColor: "lightgray",
  },
  preview: {
    flex: 1,
  },
});

export default MarkdownEditorScreen;
