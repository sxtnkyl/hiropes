import theme from '@/styles/theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Badge, BadgeProps, Button, ButtonProps } from '@mui/material';
import { ReactNode, useMemo } from 'react';

export type SubmissionStatus = 'inactive' | 'pending' | 'success' | 'error';
export interface SubmitButtonProps {
  status: SubmissionStatus;
  submitText?: string;
  buttonProps?: ButtonProps;
  badgeProps?: BadgeProps;
}

const badgeSx = {
  backgroundColor: `${theme.palette.secondary.main}`,
  borderRadius: '50%',
};

export const SubmitButton = ({
  status = 'inactive',
  submitText = 'Submit',
  buttonProps,
  badgeProps,
}: SubmitButtonProps) => {
  const buttonContent = useMemo(() => {
    switch (status) {
      case 'pending':
        return 'submitting...';
      case 'success':
        return 'success';
      case 'error':
        return 'failed';
      default:
        return submitText;
    }
  }, [status, submitText]);

  const badgeIcon: ReactNode = useMemo(() => {
    switch (status) {
      case 'pending':
        return buttonProps?.endIcon;
      case 'success':
        return <CheckCircleOutlineIcon sx={badgeSx} />;
      case 'error':
        return <ErrorOutlineIcon sx={badgeSx} />;
      default:
        return buttonProps?.endIcon;
    }
  }, [buttonProps?.endIcon, status]);

  const buttonColor: ButtonProps['color'] = useMemo(() => {
    switch (status) {
      case 'pending':
        return buttonProps?.color;
      case 'success':
        return buttonProps?.color;
      case 'error':
        return 'secondary';
      default:
        return 'secondary';
    }
  }, [buttonProps?.color, status]);

  return (
    <Badge badgeContent={badgeIcon} {...badgeProps}>
      <Button fullWidth color={buttonColor} {...buttonProps}>
        {buttonContent}
      </Button>
    </Badge>
  );
};
