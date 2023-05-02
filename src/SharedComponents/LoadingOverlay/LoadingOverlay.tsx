import theme from '@/styles/theme';
import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
interface LoadingOverlayProps extends CircularProgressProps {
  loading: boolean;
}

export const LoadingOverlay = ({ loading, ...rest }: LoadingOverlayProps) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            background: `${theme.palette.primary.light}`,
            height: '-webkit-fill-available',
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            opacity: 0.75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" size="3rem" {...rest} />
        </Box>
      )}
    </>
  );
};
