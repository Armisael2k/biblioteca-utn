import { NativeBaseProvider } from 'native-base';
import Toast, { BaseToast } from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './screens/InicioScreen';
import RegistrarEntradaScreen from './screens/RegistrarEntradaScreen';
import PrestamoComputadoraScreen from './screens/PrestamoComputadoraScreen';
import PrestamoLibroScreen from './screens/PrestamoLibroScreen';
import DevolucionLibroScreen from './screens/DevolucionLibroScreen';
import EscanerModal from "./modals/EscanerModal";

const Stack = createStackNavigator();

const toastTextStyle = {
  text1Style: {
    fontSize: 20,
  },
  text2Style: {
    fontSize: 17,
    color: '#5B5B5B',
    fontWeight: '500'
  }
}

const toastConfig = {
  info: (props) => (
    <BaseToast
      {...props}
      {...toastTextStyle}
      style={{ borderLeftColor: '#9C9C9C' }}
    />
  ),
  success: (props) => (
    <BaseToast
      {...props}
      {...toastTextStyle}
      style={{ borderLeftColor: '#16BF2B' }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      {...toastTextStyle}
      style={{ borderLeftColor: '#EC0909' }}
    />
  ),
};

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Group>
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="RegistrarEntrada" component={RegistrarEntradaScreen} />
            <Stack.Screen name="PrestamoComputadora" component={PrestamoComputadoraScreen} />
            <Stack.Screen name="PrestamoLibro" component={PrestamoLibroScreen} />
            <Stack.Screen name="DevolucionLibro" component={DevolucionLibroScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Escaner" component={EscanerModal} />
          </Stack.Group>
        </Stack.Navigator>
        <Toast config={toastConfig}/>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
