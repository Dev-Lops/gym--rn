/* eslint-disable react-native/no-raw-text */
import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Avatar } from './Avatar';
import { LogOut } from 'lucide-react-native';

export function HomeHeader() {
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <Avatar
        source={{ uri: 'https://github.com/dev-lops.png' }}
        w="$16"
        h="$16"
        alt="imagem do usuário"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          Anderson Lopes
        </Heading>
      </VStack>
      <Icon as={LogOut} color="$gray200" size="xl" />
    </HStack>
  );
}
