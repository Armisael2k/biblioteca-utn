import { useState } from "react";
import { Box, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Picker from "../components/Picker";
import Toast from 'react-native-toast-message';
import axios from "axios";

export default function PrestamoLibroScreen({ route, navigation }) {
  const [tipo, setTipo] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerItems, setPickerItems] = useState([
    {label: 'Alumno', value: 1},
    {label: 'Docente', value: 2},
    {label: 'Externo', value: 3}
  ]);
  const [nombre, setNombre] = useState('');
  const [informacion, setInformacion] = useState('');
  const [libro, setLibro] = useState('');

  const handleClickRegistrar = () => {
    if (!tipo) return Toast.show({ type: 'error', text1: 'Error',  text2: 'Selecciona el tipo de usuario' });
    if (nombre.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el nombre' });
    if (informacion.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa la carrera' });
    if (libro.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el libro' });
    axios({
      method: 'post',
      url: 'http://192.168.101.77:900/api/registrar-prestamo-libro',
      data: {  
        nombre: nombre.trim(),
        informacion: informacion.trim(),
        tipo,
        libro,
      }
    })
    .then(({ data }) => {
      if (data.success === 1) {
        Toast.show({ type: 'success', text1: 'Éxito',  text2: data.message || 'Prestamo registrado con éxito' });
        navigation.goBack();
      }
      else Toast.show({ type: 'error', text1: 'Error',  text2: data.message || 'Error al registrar el prestamo' });
    })
    .catch(err => {
      Toast.show({ type: 'error', text1: 'ERROR', text2: 'Hay problemas en la red' });
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box paddingX={7} flex={1} flexGrow={1}>
        <Box marginX={-3} marginTop={10} marginBottom={20} justifyContent="center">
          <Text fontSize={22} fontWeight="700" textAlign="center">Prestamo Libro</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton} activeOpacity={0.6}>
            <FontAwesome5 name="angle-left" size={35} color="#2b2b2b" />
          </TouchableOpacity>
        </Box>
        <VStack space={5}>
        <Picker
            placeholder="Tipo de usuario"
            open={pickerOpen}
            value={tipo}
            items={pickerItems}
            setOpen={setPickerOpen}
            setValue={setTipo}
            setItems={setPickerItems}
          />
          <TextInput
            placeholder="Nombre..."
            value={nombre}
            onChangeText={text => setNombre(text)}
          />
          <TextInput
            placeholder={tipo === 3 ? 'Información...' : 'Carrera'}
            value={informacion}
            onChangeText={text => setInformacion(text)}
          />
          <TextInput
            placeholder="Código del Libro..."            
            value={libro}
            onChangeText={text => setLibro(text)}
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