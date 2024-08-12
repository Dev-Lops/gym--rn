/* eslint-disable react-native/no-raw-text */
import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Avatar } from './Avatar';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@hooks/useAuth';

import defaultAvatar from '@assets/userPhotoDefault.png';
import { TouchableOpacity } from 'react-native';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <Avatar
        source={user.avatar ? { uri: user.avatar } : defaultAvatar}
        w="$16"
        h="$16"
        alt="imagem do usuário"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  );
}
