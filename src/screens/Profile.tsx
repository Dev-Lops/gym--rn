/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <Avatar
            source={{ uri: 'https://github.com/dev-lops.png' }}
            alt="Imagem de perfil do usário"
            size="xl"
          />

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input
              value="developesanderson@gmail.com"
              bg="$gray600"
              isReadOnly
            />
          </Center>
          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$10"
          >
            Alterar senha
          </Heading>
          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input
              placeholder="Confirma nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
