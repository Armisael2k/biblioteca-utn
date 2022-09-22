import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Heading, Box, Modal } from "native-base";
import Button from "./Button";

export default function Escaner({ open, onClose, ...props }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [textPermission, setTextPermission] = useState("Obteniendo permisos para la cámara...");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const permission = status === "granted";
      if (!permission) {
        Toast.show({
          type: "error",
          text1: "ERROR",
          text2: "No tienes permisos"
        });
        setTextPermission("La aplicación no tiene permisos para la cámara");
      }
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  return (
    <Modal isOpen={open}>
      <Modal.Content>
        <Modal.Body>

        {hasPermission ?
          <BarCodeScanner
            style={{
              borderWidth: 2,
              // flexGrow: 1,
              width: '100%',
              height: '100%',
            }}
            {...props}
          />
        : <Heading textAlign="center">{textPermission}</Heading> }
        <Button label="Volver"/>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}