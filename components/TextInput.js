import { StyleSheet, TextInput as TextInput2 } from "react-native";

export default function TextInput({ style, ...props }) {
  return (
    <TextInput2 {...props} style={[styles.input, style]} placeholderTextColor="#7b7b7b"/>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#d7d7d7",
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 30,
    fontSize: 22,
    fontWeight: "700",
  }
});