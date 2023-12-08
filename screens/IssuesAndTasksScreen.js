import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const issuesData = [
  {
    id: 1,
    title: "Bug: App crashes on startup",
    description: "The app crashes immediately upon opening.",
    status: "Open",
  },
  {
    id: 2,
    title: "Feature Request: Dark mode",
    description: "Implement a dark mode option for the app.",
    status: "Open",
  },
  {
    id: 3,
    title: "Bug: Unable to login",
    description: "Users are unable to log in to their accounts.",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Enhancement: Improve performance",
    description: "Optimize app performance for smoother navigation.",
    status: "Open",
  },
  {
    id: 5,
    title: "Bug: Incorrect data displayed",
    description: "Data displayed on some screens is incorrect.",
    status: "Closed",
  },
  {
    id: 6,
    title: "Feature Request: Push notifications",
    description: "Add push notification support for new updates.",
    status: "Open",
  },
];

function IssuesAndTasksScreen({ navigation }) {
  const [selectedIssue, setSelectedIssue] = React.useState(null);

  // Function to handle selecting an issue
  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
  };

  // Function to close the selected issue
  const handleCloseIssue = () => {
    setSelectedIssue(null);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Issues</Text> */}
      <FlatList
        data={issuesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.issueItem}
            onPress={() => handleSelectIssue(item)}
          >
            <Text style={styles.issueTitle}>{item.title}</Text>
            <Text style={styles.issueStatus}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedIssue && (
        <View style={styles.selectedIssue}>
          <Text style={styles.selectedIssueTitle}>{selectedIssue.title}</Text>
          <Text style={styles.selectedIssueDescription}>
            {selectedIssue.description}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseIssue}
          >
            <Text style={styles.closeButtonText}>Close Issue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issueItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  issueStatus: {
    fontSize: 14,
    color: "#333",
  },
  selectedIssue: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  selectedIssueTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedIssueDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    marginTop: 20,
    borderRadius: 4,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IssuesAndTasksScreen;
