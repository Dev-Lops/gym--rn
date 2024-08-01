import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg="$green700"
      borderWidth="$0"
      borderColor="$green500"
      rounded="$sm"
      $active-bg="$green500"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Text color="$white">{title}</Text> : <ButtonSpinner />}
    </GluestackButton>
  );
}
