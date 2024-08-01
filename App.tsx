import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  return (
    <View
      style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
      }}>
      {fontsLoaded ? <Text>Home</Text> : <View />}
    </View>
  );
}
