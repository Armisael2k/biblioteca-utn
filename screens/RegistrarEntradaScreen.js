import { useState, useEffect } from "react";
import { Box, Text, VStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Picker from "../components/Picker";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { ip } from "../globals";


export default function RegistrarEntradaScreen({ route, navigation }) {
  const [tipo, setTipo] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerItems, setPickerItems] = useState([
    {label: 'Alumno', value: 1},
    {label: 'Docente', value: 2},
    {label: 'Externo', value: 3}
  ]);
  const [nombre, setNombre] = useState('');
  const [informacion, setInformacion] = useState('');

  useEffect(() => {
    if (route.params?.scanned) {
      navigation.setParams({scanned: null})
      axios({
        method: 'post',
        url: `http://${ip}/api/alumno`,
        data: {
          matricula: route.params.scanned
        }
      })
      .then(function (response) {
        const { data } = response;
        if (data.success === 1) {
          if (data.result) {
            Toast.show({ type: 'success', text1: 'Éxito', text2: 'Código escaneado' });
            setNombre(data.result.nombre);
            setInformacion(data.result.carrera);
          } else {
            Toast.show({ type: 'error', text1: 'Error', text2: 'El alumno no fue encontrado' });
          }
        }
      })
      .catch(err => {
        Toast.show({ type: 'error', text1: 'ERROR', text2: 'Hay problemas en la red' });
      });
    }
  }, [route.params?.scanned]);

  const handleClickRegistrar = () => {
    if (!tipo) return Toast.show({ type: 'error', text1: 'Error',  text2: 'Selecciona el tipo de usuario' });
    if (nombre.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa el nombre' });
    if (tipo != 3 && informacion.trim() == '') return Toast.show({ type: 'error', text1: 'Error',  text2: 'Ingresa la carrera' });
    axios({
      method: 'post',
      url: `http://${ip}/api/registrar-entrada`,
      data: {  
        nombre: nombre.trim(),
        informacion: informacion.trim(),
        tipo,
      }
    })
    .then(({ data }) => {
      if (data.success === 1) {
        Toast.show({ type: 'success', text1: 'Éxito',  text2: 'Entrada registrada con éxito' });
        navigation.goBack();
      }
      else Toast.show({ type: 'error', text1: 'Error',  text2: 'Error al registrar la entrada' });
    })
    .catch(err => {
      Toast.show({ type: 'error', text1: 'ERROR', text2: 'Hay problemas en la red' });
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box paddingX={7} flex={1} flexGrow={1}>
        <Box marginX={-3} marginTop={10} marginBottom={20} justifyContent="center">
          <Text fontSize={22} fontWeight="700" textAlign="center">Registrar Entrada</Text>
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
          {tipo === 1 ?
            <Button
              onPress={() => navigation.navigate("Escaner")}
              label="Escanear"
            />
          : null}
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
        </VStack>
        <Box flex={1} justifyContent="flex-end" marginBottom={10}>
          <Button
            onPress={handleClickRegistrar}
            label="Registrar"
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