import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { FIREBASE_DB } from "../FirebaseConfig";

function IssuesAndTasksScreen({ navigation }) {
  const [selectedIssue, setSelectedIssue] = React.useState(null);

  const [isAddIssueModalVisible, setAddIssueModalVisible] =
    React.useState(false);
  const [isAddMetaModalVisible, setAddMetaModalVisible] = React.useState(false);
  const [newMetaTitle, setNewMetaTitle] = React.useState("");
  const [newMetaDateTime, setNewMetaDateTime] = React.useState("");

  const [newIssueTitle, setNewIssueTitle] = React.useState("");
  const [newIssueDescription, setNewIssueDescription] = React.useState("");

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(FIREBASE_DB, "tasks"), orderBy("title", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTasks(tasks);
    });
    return () => unsubscribe();
  }, []);

  const closeAddMetaModal = () => {
    setAddMetaModalVisible(false);
    setNewMetaTitle("");
    setNewMetaDateTime("");
  };

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseIssue = () => {
    setSelectedIssue(null);
  };

  const closeAddIssueModal = () => {
    setAddIssueModalVisible(false);
    setNewIssueTitle("");
    setNewIssueDescription("");
  };

  const handleAddMeta = () => {
    if (!newMetaTitle || !newMetaDateTime) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    Alert.alert(
      "Voce receberá uma notifiação dessa issue ás: " + newMetaDateTime,
    );
    closeAddMetaModal();
  };

  const handleAddIssue = () => {
    if (!newIssueTitle || !newIssueDescription) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    addDoc(collection(FIREBASE_DB, "tasks"), {
      title: newIssueTitle,
      description: newIssueDescription,
      status: "Open",
    });

    closeAddIssueModal();
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar" onPress={() => setAddIssueModalVisible(true)} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.issueContainer}>
            <TouchableOpacity
              style={styles.issueItem}
              onPress={() => handleSelectIssue(item)}
            >
              <Text style={styles.issueTitle}>{item.title}</Text>
              <Text style={styles.issueStatus}>Status: {item.status}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {selectedIssue && (
        <View style={styles.selectedIssue}>
          <Text style={styles.selectedIssueTitle}>{selectedIssue.title}</Text>
          <Text style={styles.selectedIssueDescription}>
            {selectedIssue.description}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setAddMetaModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Adicionar meta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseIssue}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal animationType="slide" transparent visible={isAddIssueModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Issue</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Título da Issue"
              value={newIssueTitle}
              onChangeText={(text) => setNewIssueTitle(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Descrição da Issue"
              value={newIssueDescription}
              onChangeText={(text) => setNewIssueDescription(text)}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancelar"
                onPress={closeAddIssueModal}
                color="#d9534f"
              />
              <Button
                title="Adicionar"
                onPress={handleAddIssue}
                color="#007BFF"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={isAddMetaModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Meta</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Título da Meta"
              value={newMetaTitle}
              onChangeText={(text) => setNewMetaTitle(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Horário"
              value={newMetaDateTime}
              onChangeText={(text) => setNewMetaDateTime(text)}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancelar"
                onPress={closeAddMetaModal}
                color="#d9534f"
              />
              <Button
                title="Adicionar"
                onPress={handleAddMeta}
                color="#007BFF"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  issueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issueItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flex: 1,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
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
  button: {
    backgroundColor: "#3182ce",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  closeButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default IssuesAndTasksScreen;
