import { timeConverters } from '@/utils/timeConverters';
import { Button, Typography } from '@mui/material';
import MuiNextLink, { MuiNextLinkProps } from '../MuiNext/MuiNextLink';

const TimerButton = ({
  children,
  href = '/create',
  ...rest
}: MuiNextLinkProps) => {
  return (
    <MuiNextLink sx={{ width: '50%' }} href={href} {...rest}>
      <Button variant="outlined" color="inherit" fullWidth>
        {children}
      </Button>
    </MuiNextLink>
  );
};

const TimerTitle = ({
  title,
  pomoTimer,
  workoutInProgress,
}: {
  title: string;
  pomoTimer: number;
  workoutInProgress: boolean;
}) => {
  const { formattedSecondsToMinuteSeconds } = timeConverters();
  const { minutes, seconds } = formattedSecondsToMinuteSeconds(pomoTimer);
  return (
    <Typography
      variant="h4"
      {...(workoutInProgress && { component: TimerButton })}
    >
      {workoutInProgress ? `${minutes}m : ${seconds}s` : title}
    </Typography>
  );
};

export default TimerTitle;
