/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import {
  Center,
  Heading,
  Image,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { AppError } from '@utils/AppError';
import { api } from '@services/api';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
  email: yup
    .string()
    .required('Email é obrigatório.')
    .email('Insira um email válido.'),
  password: yup
    .string()
    .required('Senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  password_confirm: yup
    .string()
    .required('Confirmação de senha é obrigatória.')
    .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais.'),
});

export function SignUp() {
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleReturnToLogin() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post('/users', { email, password, name });
      console.log(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde!';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
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

        <VStack flex={1} px="$10" pb="$20">
          <Center my={'$24'}>
            <Logo size={128} />

            <Text color="$gray100" fontSize={'$sm'}>
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

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
                />
              )}
            />
            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            mt="$12"
            onPress={handleReturnToLogin}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
