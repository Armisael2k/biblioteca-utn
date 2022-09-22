import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Button( { label, labelStyle, style, ...props } ) {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]} activeOpacity={0.6}>
      <Text style={[styles.buttonText, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#63b76d",
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center"
  },
});