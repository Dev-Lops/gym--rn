/* eslint-disable react-native/no-raw-text */
import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed';

import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray600">
      <Image
        w="$full"
        h={624}
        defaultSource={BackGroundImg}
        source={BackGroundImg}
        alt="Pessoas treinando"
        position="absolute"
      />

      <VStack flex={1} px="$10" pb="$16">
        <Center my={'$24'}>
          <Logo size={128} />

          <Text color="$gray100" fontSize={'$sm'}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center gap="$2">
          <Heading color="$gray100">Acesse a Conta</Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" isLoading />
        </Center>
      </VStack>
    </VStack>
  );
}
