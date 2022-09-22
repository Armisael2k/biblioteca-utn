import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Picker from "../components/Picker";
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function RegistrarEntradaScreen({ route, navigation }) {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');

  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerItems, setPickerItems] = useState([
    {label: 'Alumno', value: 'alumno'},
    {label: 'Docente', value: 'docente'},
    {label: 'Externo', value: 'externo'}
  ]);

  useEffect(() => {
    if (route.params?.scanned) {
      navigation.setParams({scanned: null})
      axios({
        method: 'post',
        url: 'http://192.168.144.64:900/api/alumno',
        data: {
          matricula: route.params.scanned
        }
      })
      .then(function (response) {
        const { data } = response;
        if (data.success === 1) {
          if (data.result) {
            Toast.show({
              type: 'success',
              text1: 'Éxito',
              text2: 'Código escaneado'
            });
            setNombre(data.result.nombre);
            setCarrera(data.result.carrera);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'El alumno no fue encontrado'
            });
          }
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: 'Hay problemas en la red'
        });
      })
      ;
    }
  }, [route.params?.scanned]);

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
            value={tipoUsuario}
            items={pickerItems}
            setOpen={setPickerOpen}
            setValue={setTipoUsuario}
            setItems={setPickerItems}
          />
          {tipoUsuario === 'alumno' ?
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
          {tipoUsuario !== 'externo' ?
            <TextInput
              placeholder="Carrera..."
              value={carrera}
              onChangeText={text => setCarrera(text)}
            />
          : null}
        </VStack>
        <Box flex={1} justifyContent="flex-end" marginBottom={10}>
          <Button label="Registrar"/>
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