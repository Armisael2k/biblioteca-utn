import { useState } from "react";
import { Box, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { ip } from "../globals";


export default function PrestamoComputadoraScreen({ route, navigation }) {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [grupo, setGrupo] = useState("");
  const [computadora, setComputadora] = useState("");

  const handleClickRegistrar = () => {
    if (nombre.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el Nombre' });
    if (carrera.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el Carrera' });
    if (grupo.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el Grupo' });
    if (computadora.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el No. computadora' });
    axios({
      method: 'post',
      url: `http://${ip}/api/registrar-prestamo-computadora`,
      data: {  
        nombre: nombre.trim(),
        carrera: carrera.trim(),
        grupo: grupo.trim(),
        computadora: computadora.trim(),
      }
    }).then(({ data }) => {
      if (data.success === 1) {
        Toast.show({ type: 'success', text1: 'Éxito',  text2: 'Préstamo registrado con éxito' });
        navigation.goBack();
      }
      else Toast.show({ type: 'error', text1: 'Error',  text2: 'Error al registrar el préstamo' });
    }).catch(err => {
      Toast.show({ type: 'error', text1: 'ERROR', text2: 'Hay problemas en la red' });
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box paddingX={7} flex={1} flexGrow={1}>
        <Box marginX={-3} marginTop={10} marginBottom={20} justifyContent="center">
          <Text fontSize={22} fontWeight="700" textAlign="center">Prestamo PC</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton} activeOpacity={0.6}>
            <FontAwesome5 name="angle-left" size={35} color="#2b2b2b"
          />
          </TouchableOpacity>
        </Box>
        <VStack space={5}>
          <TextInput
            placeholder="Nombre..."
            value={nombre}
            onChangeText={text => setNombre(text)}
          />
          <TextInput
            placeholder="Carrera..."
            value={carrera}
            onChangeText={text => setCarrera(text)}
          />
          <TextInput
            placeholder="Grupo..."
            value={grupo}
            onChangeText={text => setGrupo(text)}
          />
          <TextInput
            placeholder="No. Computadora..."
            value={computadora}
            onChangeText={text => setComputadora(text)}
            keyboardType="decimal-pad"
          />
        </VStack>
        <Box flex={1} justifyContent="flex-end" marginBottom={10}>
          <Button
            label="Registrar"
            onPress={handleClickRegistrar}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: "red"
  },
  backButton: {
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
});