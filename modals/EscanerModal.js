import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Heading } from "native-base";
import { Camera } from "expo-camera";
import { StyleSheet, Animated } from "react-native";
import Button from "../components/Button";

export default function EscanerModal({ navigation }) {
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length-2];
  
  const handleVolver = () => {
    navigation.goBack();
  }

  const offset = useRef(new Animated.Value(0)).current;
  const animation = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(offset, {
          toValue: 320,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(offset, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        })
      ])
    )
  ).current;

  const [hasPermission, setHasPermission] = useState(null);
  const [textPermission, setTextPermission] = useState("Obteniendo permisos...");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status == "granted") setTextPermission("Coloca el código en la cámara");
      else setTextPermission("La aplicación no tiene permisos para la cámara");
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  
  const handleScanned = ({ data }) => {
    if ( !scanned && (data.length == 10 || data.length == 8) ) {
      animation.stop();
      cameraRef.current.pausePreview();
      setScanned(true);
      navigation.navigate({
        name: prevRoute.name,
        params: { scanned: data },
        merge: true,
      });
    }
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Heading textAlign="center" size="md" color="#50514f" marginBottom={2}>{textPermission}</Heading>
      <Box overflow="hidden" borderRadius={30} width={330} height={330} backgroundColor="#50514f">
        {hasPermission ? 
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            ratio="1:1"
            onBarCodeScanned={handleScanned}
            onCameraReady={() => animation.start()}
          />
        : null}
        <Animated.View top={offset} width="100%" height={5} backgroundColor="#00ff00"/>
      </Box>
      <Box marginTop={5} width="100%" paddingX={7}>
        <Button
          onPress={handleVolver}
          label="Volver"
        />
      </Box>
    </SafeAreaView>
  );
}

const border = {
  borderWidth: 2,
  borderColor: "red"
}