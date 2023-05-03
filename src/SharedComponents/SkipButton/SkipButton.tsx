import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, ButtonProps } from '@mui/material';

interface SkipButtonProps extends ButtonProps {
  buttonText: string;
}
export const SkipButton = ({ buttonText, ...rest }: SkipButtonProps) => {
  return (
    <Button variant="outlined" endIcon={<SkipNextIcon />} fullWidth {...rest}>
      {buttonText}
    </Button>
  );
};
