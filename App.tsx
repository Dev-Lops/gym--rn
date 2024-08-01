import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { config } from '@gluestack-ui/config';
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { StatusBar, View } from 'react-native';
import { Loading } from '@components/Loading';
import { SignIn } from '@screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  return (
    <GluestackUIProvider config={config}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (<SignIn />) : (<Loading />)}
    </GluestackUIProvider>
  );
}
