import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { config } from './config/gluestack-ui.config';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContex';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
