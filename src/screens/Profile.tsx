/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';

import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { ToastMessage } from '@components/ToastMessage';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';
import { Avatar } from '@components/Avatar';

import defaultAvatar from '@assets/userPhotoDefault.png';

type FormDataProps = {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  old_password?: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => (value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (field: string | null) => !!field,
      then: (schema) =>
        schema
          .nullable()
          .required('Confirme a senha.')
          .transform((value) => (value ? value : null)),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      old_password: '',
      confirm_password: '',
    },
    //@ts-ignore
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!photoSelected.canceled && photoSelected.assets[0].uri) {
        const photoURI = photoSelected.assets[0].uri;

        const photoInfo = await FileSystem.getInfoAsync(photoURI);
        if (photoInfo.exists && 'size' in photoInfo) {
          const sizeInMB = photoInfo.size / 1024 / 1024;
          if (sizeInMB > 5) {
            return toast.show({
              placement: 'top',
              render: ({ id }: { id: string }) => (
                <ToastMessage
                  id={id}
                  action="error"
                  title="A imagem selecionada é muito grande. Escolha uma imagem de até 5MB."
                  onClose={() => toast.close(id)}
                  description=""
                />
              ),
            });
          }
        } else {
          throw new Error('Não foi possível verificar o tamanho da imagem.');
        }

        const fileExtension = photoURI.split('.').pop() || '';
        const fileType = `image/${fileExtension}`;

        const photoFile = {
          uri: photoURI,
          name: `${user.name}.${fileExtension.toLowerCase()}`,
          type: fileType,
        };

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile as any);

        const avatarUpdatedResponse = await api.patch(
          '/users/avatar',
          userPhotoUploadForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const userUpdated = {
          ...user,
          avatar: avatarUpdatedResponse.data.avatar,
        };
        await updateUserProfile(userUpdated);

        toast.show({
          placement: 'top',
          render: ({ id }: { id: string }) => (
            <ToastMessage
              id={id}
              action="success"
              title="Foto atualizada"
              onClose={() => toast.close(id)}
              description=""
            />
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.show({
        placement: 'top',
        render: ({ id }: { id: string }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao atualizar a foto"
            onClose={() => toast.close(id)}
            description=""
          />
        ),
      });
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleUpdateProfile(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = { ...user, name: data.name };
      await api.put('/users', data);
      await updateUserProfile(userUpdated);

      toast.show({
        placement: 'top',
        render: ({ id }: { id: string }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Perfil atualizado com sucesso!"
            onClose={() => toast.close(id)}
            description=""
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Falha ao atualizar o perfil.';

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
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          {photoIsLoading ? (
            <Loading />
          ) : (
            <Avatar
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultAvatar
              }
              alt="imagem do usuário"
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              fontFamily="$heading"
              color="$green500"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="E-mail"
                  isReadOnly
                  onChangeText={onChange}
                  value={value}
                />
              )}
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
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Confirmar senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />
          </Center>
          <Button
            title="Atualizar"
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isUpdating}
            mt="$10"
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
