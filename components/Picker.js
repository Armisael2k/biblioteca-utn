import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Picker({ value, ...props}) {
  return (
    <DropDownPicker
      {...props}
      value={value}
      style={styles.container}
      dropDownContainerStyle={styles.dropDownContainer}
      textStyle={styles.text}
      placeholderStyle={styles.placeholder}
      listItemLabelStyle={styles.listItemLabel}
      ArrowDownIconComponent={({style}) => <FontAwesome5 name="angle-down" style={style} size={24} color={!value ? "#7b7b7b" : "black"}/>}
      ArrowUpIconComponent={({style}) => <FontAwesome5 name="angle-up" style={style} size={24} color={!value ? "#7b7b7b" : "black"}/>}
      TickIconComponent={({style}) => <FontAwesome5 name="check" style={style} size={15} color="black"/>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d7d7d7",
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 30,
    borderWidth: 0,
  },
  dropDownContainer: {
    backgroundColor: "#d7d7d7",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#CDCDCD",
    elevation: 10,
    borderTopWidth: 2,
    borderRadius: 25,
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
  },
  placeholder: {
    color: "#7b7b7b"
  },
  listItemLabel: {
    color: "#616161"
  }
});