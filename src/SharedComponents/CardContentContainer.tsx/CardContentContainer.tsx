import { Card, CardProps, Stack, StackProps } from '@mui/material';
import { ReactNode } from 'react';

export interface CardContentContainerProps extends CardProps {
  stackProps?: StackProps;
  children: ReactNode;
}
const CardContentContainer = ({
  children,
  sx = { height: '100%' },
  stackProps,
  ...rest
}: CardContentContainerProps) => {
  return (
    <Card sx={sx} raised {...rest}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        margin={'2rem 1rem'}
        textAlign={'center'}
        {...stackProps}
      >
        {children}
      </Stack>
    </Card>
  );
};

export default CardContentContainer;
