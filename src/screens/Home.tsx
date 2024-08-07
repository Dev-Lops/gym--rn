/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { AppNavigatorRoutesProps } from '@routes/app.routes';
import { FlatList, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
  ]);
  const [groups, setGroups] = useState([
    'Costas',
    'Bíceps',
    'Tríceps',
    'Ombro',
  ]);
  const [groupSelected, setGroupSelected] = useState('Costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }
  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Group
            name={item as string}
            isActive={
              groupSelected.toLocaleLowerCase() ===
              (item as string).toLocaleLowerCase()
            }
            onPress={() => setGroupSelected(item as string)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />
      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercicios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={(item) => String(item)}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
