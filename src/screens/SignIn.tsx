import { Image, VStack } from "@gluestack-ui/themed";

import BackGroundImg from "@assets/background.png"

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        w="$full"
        h={624}
        defaultSource={BackGroundImg}
        source={BackGroundImg}
        alt="Pessoas treinando"
        position="absolute"
      />

    </VStack>
  )
}