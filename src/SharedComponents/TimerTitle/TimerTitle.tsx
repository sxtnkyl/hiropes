import { timeConverters } from '@/utils/timeConverters';
import { Button, ButtonProps, Typography } from '@mui/material';

const TimerButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{ width: '50%' }}
      {...props}
    />
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
