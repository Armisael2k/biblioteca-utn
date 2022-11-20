import { Box, Heading, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Box paddingX={7} flexGrow={1}>
        <Heading position="absolute" marginTop={10} size="xl" alignSelf="center">Control de biblioteca</Heading>
        <Box flex={1} justifyContent="center">
          <Heading size="md" marginBottom={2} textAlign="center" color="#50514f">Selecciona una opción</Heading>
          <VStack space={5}>
            <Button
              onPress={() => navigation.navigate("RegistrarEntrada")}
              label="Registrar entrada"
             />
            <Button
              onPress={() => navigation.navigate("PrestamoComputadora")}
              label="Préstamo de PC"
              />
            <Button
              onPress={() => navigation.navigate("PrestamoLibro")}
              label="Préstamo de libro"
            />
            <Button
              onPress={() => navigation.navigate("DevolucionLibro")}
              label="Devolución de libro"
            />
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}