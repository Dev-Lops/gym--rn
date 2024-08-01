import { Center, Image, Text, VStack } from "@gluestack-ui/themed";

import BackGroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"

export function SignIn() {
  return (
    <VStack flex={1} bg="$backgroundDark400">
      <Image
        w="$full"
        h={624}
        defaultSource={BackGroundImg}
        source={BackGroundImg}
        alt="Pessoas treinando"
        position="absolute"
      />

      <Center my={'$24'}>
        <Logo size={128} />

        <Text color="$gray100" fontSize={"$sm"}>
          Treine sua mente e o seu corpo
        </Text>
      </Center>

    </VStack>
  )
}