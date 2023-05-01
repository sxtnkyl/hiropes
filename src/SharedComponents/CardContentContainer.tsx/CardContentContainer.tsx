import { Card, CardProps, Stack, StackProps } from '@mui/material';
import { ReactNode } from 'react';

export interface CardContentContainerProps extends CardProps {
  stackProps?: StackProps;
  children: ReactNode;
}
const CardContentContainer = ({
  children,
  sx,
  stackProps,
  ...rest
}: CardContentContainerProps) => {
  return (
    <Card
      raised
      sx={{ height: '100%', position: 'relative', padding: '2rem', ...sx }}
      {...rest}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
        {...stackProps}
      >
        {children}
      </Stack>
    </Card>
  );
};

export default CardContentContainer;
