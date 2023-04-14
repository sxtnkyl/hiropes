import CottageIcon from '@mui/icons-material/Cottage';
import { IconButton, IconButtonProps } from '@mui/material';
import MuiNextLink, { MuiNextLinkProps } from '../MuiNext/MuiNextLink';

type RightActionHomeLinkProps = {
  muinextprops?: MuiNextLinkProps;
  iconButtonProps?: IconButtonProps;
};

const RightActionHomeLink = ({
  muinextprops,
  iconButtonProps,
}: RightActionHomeLinkProps) => {
  return (
    <MuiNextLink {...{ muinextprops, href: '/' }}>
      <IconButton aria-label="home" color="inherit" {...iconButtonProps}>
        <CottageIcon />
      </IconButton>
    </MuiNextLink>
  );
};

export default RightActionHomeLink;
