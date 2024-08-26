/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import { useNavigation } from '@react-navigation/native';
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import * as yup from 'yup';

import {
  Center,
  Heading,
  Image,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';

import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';
import { ToastMessage } from '@components/ToastMessage';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Email é obrigatório.')
    .email('Insira um email válido.'),
  password: yup
    .string()
    .required('Senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Falha na autenticação.';

      setIsLoading(false);
      if (toast) {
        toast.show({
          placement: 'top',
          render: ({ id }: { id: string }) => (
            <ToastMessage
              id={id}
              action="error"
              title={title}
              onClose={() => toast.close(id)}
              description=""
            />
          ),
        });
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>
          <Center
            flex={1}
            alignItems="center"
            justifyContent="flex-end"
            mt="$4"
          >
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não possui uma conta?
            </Text>
            <Button
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
