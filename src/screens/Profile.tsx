/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Avatar } from '@components/Avatar';
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

type ProfileSchema = {
  name: string;
  email: string;
};

export function Profile() {
  const [userPhoto, setUserPhoto] = useState('https://github.com/dev-lops.png');

  const toast = useToast();
  const { control, handleSubmit } = useForm();

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="A imagem excede o limite de 5Mb."
                onClose={() => toast.close(id)}
                description=""
              />
            ),
          });
        }

        setUserPhoto(photoURI);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <Avatar
            source={{ uri: userPhoto }}
            alt="Imagem de perfil do usário"
            size="xl"
          />

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
                />
              )}
            />

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
