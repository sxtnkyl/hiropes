import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton, IconButtonProps } from '@mui/material';
import MuiNextLink, { MuiNextLinkProps } from '../MuiNext/MuiNextLink';

type RightActionProfileLinkProps = {
  muinextprops?: MuiNextLinkProps;
  iconButtonProps?: IconButtonProps;
};

const RightActionProfileLink = ({
  muinextprops,
  iconButtonProps,
}: RightActionProfileLinkProps) => {
  return (
    <MuiNextLink {...{ muinextprops, href: '/profile' }}>
      <IconButton aria-label="profile" color="inherit" {...iconButtonProps}>
        <AccountBoxIcon />
      </IconButton>
    </MuiNextLink>
  );
};

export default RightActionProfileLink;
