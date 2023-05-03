import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Button, ButtonProps } from '@mui/material';

interface PauseResumeButtonProps extends ButtonProps {
  paused: boolean;
  resumeAction: () => void;
  resumeText: string;
  pauseAction: () => void;
  pauseText: string;
}
export const PauseResumeButton = ({
  paused,
  resumeAction,
  resumeText,
  pauseAction,
  pauseText,
  ...rest
}: PauseResumeButtonProps) => {
  return (
    <Button
      variant={paused ? 'contained' : 'outlined'}
      onClick={paused ? resumeAction : pauseAction}
      endIcon={paused ? <PlayCircleOutlineIcon /> : <PauseIcon />}
      fullWidth
      {...rest}
    >
      {paused ? resumeText : pauseText}
    </Button>
  );
};
