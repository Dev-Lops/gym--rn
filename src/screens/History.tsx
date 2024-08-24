/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import type { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';
import { Heading, SectionList, useToast, VStack } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { useCallback, useState } from 'react';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercicíos" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          //@ts-ignore
          keyExtractor={(item) => item.id}
          //@ts-ignore
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$gray200"
              fontSize="$md"
              mt="$10"
              mb="$3"
              fontFamily="$heading"
            >
              {
                // @ts-ignore
                section.title
              }
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
      )}
    </VStack>
  );
}
