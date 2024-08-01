/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { Heading, SectionList, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '30/07/2024',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '31/07/2024',
      data: ['Puxada frontal'],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => String(item)}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontSize="$md"
            mt="$10"
            mb="$3"
            fontFamily="$heading"
          >
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Heading
            color="$gray100"
            alignContent="center"
            textAlign="center"
            fontFamily="$heading"
          >
            Nenhum exercício encontrado
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
