import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";

const anotacoesList = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Aberto",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    status: "Aberto",
  },
  {
    id: 3,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Aberto",
  },
  {
    id: 4,
    title: "Ao clicar no botão de adicionar, um modal deve ser aberto.",
    status: "Aberto",
  }
];

function AnotacoesScreen({ navigation }) {
  const [items, setItems] = React.useState(anotacoesList);
  const [newItem, setNewItem] = React.useState("");

  React.useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.issueContainer}>
            <View style={styles.issueItem}>
              <Text style={styles.issueTitle}>{item.title}</Text>
            </View>
          </View>
        )}
      />
      {/* Add input here that adds a new item to the list */}
      <View style={styles.issueContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={newItem}
          onChangeText={setNewItem}
        />

        <Button
          title="Add"
          onPress={() => {
            setItems([
              ...items,
              {
                id: items.length + 1,
                title: newItem,
                status: "Aberto",
              },
            ]);
            setNewItem("");
          }}
        />
      </View>
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
    fontSize: 12,
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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AnotacoesScreen;
